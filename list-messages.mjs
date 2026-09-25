import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

config({ path: '.env' })
const prisma = new PrismaClient()

const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' }, take: 3, select: { id: true, title: true, image: true } })
console.log(JSON.stringify(messages, null, 2))
await prisma.$disconnect()
