import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'
import { requireSuperAdmin } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    await requireSuperAdmin(event)
    const users = await prisma.user.findMany({ where: { deleted: false }, orderBy: { id: 'desc' }, select: { id: true, name: true, email: true, isSuperAdmin: true, suspended: true, createdAt: true } })
    return { users }
  }

  if (event.method === 'POST') {
    await requireSuperAdmin(event)
    const { name, email, password, isSuperAdmin } = await readBody(event)
    if (!name || !email || !password) throw createError({ statusCode: 400, message: 'All fields required' })
    const hashed = await bcrypt.hash(password, 10)
    return prisma.user.create({ data: { name, email, password: hashed, isSuperAdmin: !!isSuperAdmin } })
  }
})
