import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const stores = await prisma.store.findMany({ orderBy: { id: 'desc' } })
    return { stores }
  }

  if (event.method === 'POST') {
    const user = await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const title = get('title')?.data.toString()
    const link = get('link')?.data.toString()
    const imgFile = get('img')
    if (!title || !link || !imgFile) throw createError({ statusCode: 400, message: 'All fields required' })
    const img = await saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename || 'img.jpg' }, 'store')
    return prisma.store.create({ data: { userId: user.id, title, img, linkToResource: link } })
  }
})
