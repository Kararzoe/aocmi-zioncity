import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id')!)
  await requireAuth(event)

  if (event.method === 'PATCH') {
    await prisma.prayerRequest.update({ where: { id }, data: { isRead: true } })
    return { ok: true }
  }

  if (event.method === 'DELETE') {
    await prisma.prayerRequest.delete({ where: { id } })
    return { ok: true }
  }
})
