import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

config({ path: '.env' })
const prisma = new PrismaClient()

const hashed = await bcrypt.hash('HeavenlyJerusalem', 10)
await prisma.user.update({
  where: { email: 'admin@aocmizioncity.org' },
  data: { password: hashed }
})

console.log('Password reset done')
await prisma.$disconnect()
