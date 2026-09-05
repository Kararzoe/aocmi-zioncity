import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const { currentPassword, newPassword } = await readBody(event)
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) throw createError({ statusCode: 404, message: 'User not found' })
  const valid = await bcrypt.compare(currentPassword, dbUser.password)
  if (!valid) throw createError({ statusCode: 400, message: 'Current password is incorrect' })
  const hashed = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed, passwordUpdatedAt: new Date() } })
  return { ok: true }
})
