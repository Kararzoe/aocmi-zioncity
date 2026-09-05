import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    await requireAuth(event)
    const entries = await prisma.healingSchoolEntry.findMany({ orderBy: { id: 'desc' } })
    return { entries }
  }

  if (event.method === 'POST') {
    const { fullname, email, phone, state, city, problem, narration } = await readBody(event)
    if (!fullname || !email || !phone || !state || !city || !problem || !narration)
      throw createError({ statusCode: 400, message: 'All fields required' })
    await prisma.healingSchoolEntry.create({ data: { fullname, email, phone, state, city, problem, narration } })
    return { ok: true }
  }
})
