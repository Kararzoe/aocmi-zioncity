import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    await requireAuth(event)
    const requests = await prisma.prayerRequest.findMany({ orderBy: { id: 'desc' } })
    const unreadCount = await prisma.prayerRequest.count({ where: { isRead: false } })
    return { requests, unreadCount }
  }

  if (event.method === 'POST') {
    const { fullname, email, phone, request } = await readBody(event)
    if (!fullname || !email || !request) throw createError({ statusCode: 400, message: 'All fields required' })
    await prisma.prayerRequest.create({ data: { fullname, email, phone, request } })
    return { ok: true }
  }
})
