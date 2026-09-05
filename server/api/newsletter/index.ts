import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    await requireAuth(event)
    const subscribers = await prisma.newsletter.findMany({ orderBy: { id: 'desc' } })
    return { subscribers }
  }

  if (event.method === 'POST') {
    const { email } = await readBody(event)
    if (!email) throw createError({ statusCode: 400, message: 'Email required' })
    const existing = await prisma.newsletter.findUnique({ where: { email } })
    if (existing) return { message: 'You are already subscribed!' }
    await prisma.newsletter.create({ data: { email } })
    return { message: 'Thank you for subscribing!' }
  }
})
