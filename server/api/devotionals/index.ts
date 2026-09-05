import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'
import { makeSlug } from '~/server/utils/slug'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const q = getQuery(event)
    const slug = q.slug as string
    if (slug) {
      const d = await prisma.devotional.findUnique({ where: { slug } })
      if (!d) throw createError({ statusCode: 404, message: 'Not found' })
      return d
    }
    const devotionals = await prisma.devotional.findMany({ where: { published: true }, orderBy: { id: 'desc' } })
    return { devotionals }
  }

  if (event.method === 'POST') {
    await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const title = get('title')?.data.toString()
    const content = get('content')?.data.toString()
    const scripture = get('scripture')?.data.toString() || ''
    const imgFile = get('img')
    if (!title || !content) throw createError({ statusCode: 400, message: 'Title and content required' })
    let image = ''
    if (imgFile?.filename) image = await saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename! }, 'devotionals')
    return prisma.devotional.create({ data: { title, content, scripture, image, slug: makeSlug(title) } })
  }
})
