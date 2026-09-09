import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    return prisma.givingDetail.findFirst()
  }

  if (event.method === 'POST') {
    await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const phone = get('phone')?.data.toString() || ''
    const email = get('email')?.data.toString() || ''
    const img1File = get('image1')
    const img2File = get('image2')

    const existing = await prisma.givingDetail.findFirst()
    let image1 = existing?.image1 || ''
    let image2 = existing?.image2 || ''

    if (img1File?.filename) image1 = await saveFile({ arrayBuffer: async () => img1File.data.buffer, name: img1File.filename! }, 'givings')
    if (img2File?.filename) image2 = await saveFile({ arrayBuffer: async () => img2File.data.buffer, name: img2File.filename! }, 'givings')

    await prisma.givingDetail.deleteMany()
    return prisma.givingDetail.create({ data: { phone, email, image1, image2 } })
  }
})
