import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!

  if (event.method === 'GET') {
    const ev = await prisma.event.findUnique({ where: { slug } })
    if (!ev) throw createError({ statusCode: 404, message: 'Not found' })
    return ev
  }

  if (event.method === 'PUT') {
    await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const data: any = {}
    if (get('title')) data.title = get('title')!.data.toString()
    if (get('desc')) data.description = get('desc')!.data.toString()
    if (get('date_of_event')) data.dateOfEvent = get('date_of_event')!.data.toString()
    const imgFile = get('img')
    if (imgFile?.filename) data.image = await saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename! }, 'events')
    return prisma.event.update({ where: { slug }, data })
  }

  if (event.method === 'DELETE') {
    await requireAuth(event)
    await prisma.event.delete({ where: { slug } })
    return { ok: true }
  }
})
