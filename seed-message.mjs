import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

config({ path: '.env' })
const prisma = new PrismaClient()

await prisma.message.create({
  data: {
    userId: 1,
    title: 'Audio Message Now Available For Download – White Sunday Service',
    image: '812281491_1618340003245797_3930328719509812750_n.jpg',
    description: 'Audio Message Now Available For Download – White Sunday Service',
    link: 'https://linkmix.co/59750500',
    slug: 'white-sunday-service-audio',
  }
})

console.log('Done')
await prisma.$disconnect()
