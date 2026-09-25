import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

config({ path: '.env' })
const prisma = new PrismaClient()

await prisma.message.update({
  where: { id: 2 },
  data: { image: 'https://tfjpbwfwnbzitsyexpvd.supabase.co/storage/v1/object/public/uploads/messages/812281491_1618340003245797_3930328719509812750_n.jpg' }
})

console.log('Done')
await prisma.$disconnect()
