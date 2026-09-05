import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'
import { makeSlug } from '~/server/utils/slug'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const q = getQuery(event)
    const search = (q.search as string) || ''
    const page = parseInt((q.page as string) || '1')
    const perPage = 12
    const where = search ? { OR: [{ title: { contains: search, mode: 'insensitive' as const } }, { description: { contains: search, mode: 'insensitive' as const } }] } : {}
    const [events, total] = await Promise.all([
      prisma.event.findMany({ where, orderBy: { id: 'desc' }, skip: (page - 1) * perPage, take: perPage }),
      prisma.event.count({ where }),
    ])
    return { events, total, pages: Math.ceil(total / perPage) }
  }

  if (event.method === 'POST') {
    const user = await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const title = get('title')?.data.toString()
    const desc = get('desc')?.data.toString()
    const dateOfEvent = get('date_of_event')?.data.toString()
    const imgFile = get('img')
    if (!title || !desc || !dateOfEvent || !imgFile) throw createError({ statusCode: 400, message: 'All fields required' })
    const image = await saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename || 'img.jpg' }, 'events')
    const event_ = await prisma.event.create({ data: { userId: user.id, title, image, description: desc, dateOfEvent, slug: makeSlug(title) } })
    return event_
  }
})
