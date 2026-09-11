import webpush from 'web-push'
import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const q = getQuery(event)
    const page = parseInt((q.page as string) || '1')
    const type = (q.type as string) || ''
    const perPage = 9
    const where: any = { published: true }
    if (type) where.type = type
    const [news, total] = await Promise.all([
      prisma.news.findMany({ where, orderBy: { id: 'desc' }, skip: (page - 1) * perPage, take: perPage }),
      prisma.news.count({ where }),
    ])
    return { news, total, pages: Math.ceil(total / perPage) }
  }

  if (event.method === 'POST') {
    const config = useRuntimeConfig()
    await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const title = get('title')?.data.toString()
    const body = get('body')?.data.toString()
    const link = get('link')?.data.toString() || ''
    const type = get('type')?.data.toString() || 'news'
    const eventDateRaw = get('eventDate')?.data.toString()
    const eventDate = eventDateRaw ? new Date(eventDateRaw) : null
    const imgFile = get('img')
    if (!title || !body) throw createError({ statusCode: 400, message: 'Title and body required' })
    const image = imgFile?.filename ? await saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename || 'img.jpg' }, 'news') : ''
    const item = await prisma.news.create({ data: { title, body, image, link, type, eventDate } })

    // Send push notification to all subscribers
    try {
      webpush.setVapidDetails(config.vapidEmail, config.vapidPublicKey, config.vapidPrivateKey)
      const subs = await prisma.pushSubscription.findMany()
      const payload = JSON.stringify({ title, body: body.slice(0, 100), url: '/news' })
      await Promise.allSettled(
        subs.map(s =>
          webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload)
            .catch(async (err) => {
              if (err.statusCode === 410 || err.statusCode === 404) {
                await prisma.pushSubscription.delete({ where: { endpoint: s.endpoint } })
              }
            })
        )
      )
    } catch {}

    return item
  }
})
