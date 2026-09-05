import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const workers = await prisma.worker.findMany({ orderBy: { id: 'desc' } })
    return { workers }
  }

  if (event.method === 'POST') {
    await requireAuth(event)
    const body = await readBody(event)
    const { name, email, phone, address, unit } = body
    if (!name || !email || !phone || !address || !unit) throw createError({ statusCode: 400, message: 'All fields required' })
    return prisma.worker.create({ data: { name, email, phone, address, unit } })
  }
})
