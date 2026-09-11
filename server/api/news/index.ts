import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const q = getQuery(event)
    const page = parseInt((q.page as string) || '1')
    const perPage = 9
    const [news, total] = await Promise.all([
      prisma.news.findMany({ where: { published: true }, orderBy: { id: 'desc' }, skip: (page - 1) * perPage, take: perPage }),
      prisma.news.count({ where: { published: true } }),
    ])
    return { news, total, pages: Math.ceil(total / perPage) }
  }

  if (event.method === 'POST') {
    await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const title = get('title')?.data.toString()
    const body = get('body')?.data.toString()
    const link = get('link')?.data.toString() || ''
    const imgFile = get('img')
    if (!title || !body) throw createError({ statusCode: 400, message: 'Title and body required' })
    const image = imgFile ? await saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename || 'img.jpg' }, 'news') : ''
    return prisma.news.create({ data: { title, body, image, link } })
  }
})
