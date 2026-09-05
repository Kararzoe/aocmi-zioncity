import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const word = await prisma.wordOfTheYear.findFirst()
    return word
  }

  if (event.method === 'POST') {
    await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const title = get('title')?.data.toString()
    const description = get('description')?.data.toString()
    const imgFile = get('img')
    if (!title || !description || !imgFile) throw createError({ statusCode: 400, message: 'All fields required' })
    const img = await saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename || 'img.jpg' }, 'word-of-year')
    await prisma.wordOfTheYear.deleteMany()
    return prisma.wordOfTheYear.create({ data: { title, description, img } })
  }
})
