import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'
import { signToken } from '~/server/utils/auth'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.deleted || user.suspended)
    throw createError({ statusCode: 401, message: 'Invalid credentials or account suspended.' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw createError({ statusCode: 401, message: 'Invalid credentials or account suspended.' })
  const token = await signToken({ id: user.id, name: user.name, email: user.email, isSuperAdmin: user.isSuperAdmin })
  setCookie(event, 'auth_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' })
  return { user: { id: user.id, name: user.name, email: user.email, isSuperAdmin: user.isSuperAdmin } }
})
