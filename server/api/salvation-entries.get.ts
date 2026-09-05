import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const contacts = await prisma.contact.findMany({ orderBy: { id: 'desc' } })
  return { contacts }
})
