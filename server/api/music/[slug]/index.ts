import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!

  if (event.method === 'GET') {
    const music = await prisma.music.findUnique({ where: { slug } })
    if (!music) throw createError({ statusCode: 404, message: 'Not found' })
    return music
  }

  if (event.method === 'DELETE') {
    await requireAuth(event)
    await prisma.music.delete({ where: { slug } })
    return { ok: true }
  }
})
