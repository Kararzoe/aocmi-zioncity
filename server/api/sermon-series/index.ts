import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { makeSlug } from '~/server/utils/slug'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const series = await prisma.sermonSeries.findMany({
      orderBy: { id: 'desc' },
      include: { _count: { select: { messages: true } } },
    })
    return { series }
  }

  if (event.method === 'POST') {
    await requireAuth(event)
    const { title, description } = await readBody(event)
    if (!title) throw createError({ statusCode: 400, message: 'Title required' })
    return prisma.sermonSeries.create({ data: { title, description: description || '', slug: makeSlug(title) } })
  }
})
