import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (event.method === 'DELETE') {
    await requireAuth(event)
    await prisma.news.delete({ where: { id } })
    return { ok: true }
  }
})
