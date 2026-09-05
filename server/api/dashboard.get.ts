import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const [healingCount, salvationCount, prayerCount, newsletterCount, messages, events] = await Promise.all([
    prisma.healingSchoolEntry.count(),
    prisma.contact.count(),
    prisma.prayerRequest.count({ where: { isRead: false } }),
    prisma.newsletter.count(),
    prisma.message.findMany({ orderBy: { id: 'desc' }, take: 5 }),
    prisma.event.findMany({ orderBy: { id: 'desc' }, take: 5 }),
  ])
  return { healingCount, salvationCount, prayerCount, newsletterCount, messages, events }
})
