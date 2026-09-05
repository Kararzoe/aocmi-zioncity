import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!

  if (event.method === 'GET') {
    const message = await prisma.message.findUnique({ where: { slug }, include: { series: true } })
    if (!message) throw createError({ statusCode: 404, message: 'Not found' })
    return message
  }

  if (event.method === 'PUT') {
    await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const data: any = {}
    if (get('title')) data.title = get('title')!.data.toString()
    if (get('desc')) data.description = get('desc')!.data.toString()
    if (get('link')) data.link = get('link')!.data.toString()
    if (get('seriesId')) data.seriesId = get('seriesId')!.data.toString() ? parseInt(get('seriesId')!.data.toString()) : null
    if (get('seriesOrder')) data.seriesOrder = get('seriesOrder')!.data.toString() ? parseInt(get('seriesOrder')!.data.toString()) : null
    const imgFile = get('img')
    if (imgFile?.filename) data.image = await saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename! }, 'messages')
    const updated = await prisma.message.update({ where: { slug }, data })
    return updated
  }

  if (event.method === 'DELETE') {
    await requireAuth(event)
    await prisma.message.delete({ where: { slug } })
    return { ok: true }
  }
})
