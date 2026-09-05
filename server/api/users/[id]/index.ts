import { prisma } from '~/server/utils/prisma'
import { requireSuperAdmin } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id')!)
  await requireSuperAdmin(event)

  if (event.method === 'PATCH') {
    const { suspended } = await readBody(event)
    await prisma.user.update({ where: { id }, data: { suspended } })
    return { ok: true }
  }

  if (event.method === 'DELETE') {
    await prisma.user.update({ where: { id }, data: { deleted: true } })
    return { ok: true }
  }
})
