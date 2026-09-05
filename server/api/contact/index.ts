import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { fullname, email, phone, location } = await readBody(event)
  if (!fullname || !email || !phone || !location) throw createError({ statusCode: 400, message: 'All fields required' })
  await prisma.contact.create({ data: { fullname, email, phone, location } })
  return { ok: true }
})
