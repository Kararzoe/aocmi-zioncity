import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const photos = await prisma.galleryPhoto.findMany({ orderBy: { id: 'desc' } })
    return { photos }
  }

  if (event.method === 'POST') {
    await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const title = get('title')?.data.toString() || 'Photo'
    const category = get('category')?.data.toString() || 'general'
    const files = form.filter(f => f.name === 'photos' && f.filename)
    const results = []
    for (const file of files) {
      const img = await saveFile({ arrayBuffer: async () => file.data.buffer, name: file.filename! }, 'gallery')
      results.push(await prisma.galleryPhoto.create({ data: { title, img, category } }))
    }
    return results
  }
})
