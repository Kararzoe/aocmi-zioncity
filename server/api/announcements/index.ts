import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const announcements = await prisma.announcement.findMany({ where: { active: true }, orderBy: { id: 'desc' } })
  return { announcements }
})
