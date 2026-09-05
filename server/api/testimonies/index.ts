import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const q = getQuery(event)
    const admin = q.admin === 'true'
    if (admin) await requireAuth(event)
    const testimonies = await prisma.testimony.findMany({
      where: admin ? {} : { approved: true },
      orderBy: { id: 'desc' },
    })
    return { testimonies }
  }

  if (event.method === 'POST') {
    const { name, email, testimony } = await readBody(event)
    if (!name || !email || !testimony) throw createError({ statusCode: 400, message: 'All fields required' })
    await prisma.testimony.create({ data: { name, email, testimony } })
    return { message: 'Thank you! Your testimony has been submitted for review.' }
  }

  if (event.method === 'PUT') {
    await requireAuth(event)
    const { id, approved } = await readBody(event)
    await prisma.testimony.update({ where: { id }, data: { approved } })
    return { ok: true }
  }

  if (event.method === 'DELETE') {
    await requireAuth(event)
    const { id } = await readBody(event)
    await prisma.testimony.delete({ where: { id } })
    return { ok: true }
  }
})
