import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id')!)

  if (event.method === 'DELETE') {
    await requireAuth(event)
    await prisma.store.delete({ where: { id } })
    return { ok: true }
  }
})
