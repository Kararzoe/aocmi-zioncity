import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

config({ path: '.env' })
const prisma = new PrismaClient()

await prisma.message.update({
  where: { id: 2 },
  data: { title: 'WHITE SUNDAY SERVICE' }
})

console.log('Done')
await prisma.$disconnect()
