import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { endpoint, keys } = body
  if (!endpoint || !keys?.p256dh || !keys?.auth) throw createError({ statusCode: 400, message: 'Invalid subscription' })
  await prisma.pushSubscription.upsert({
    where: { endpoint },
    update: { p256dh: keys.p256dh, auth: keys.auth },
    create: { endpoint, p256dh: keys.p256dh, auth: keys.auth },
  })
  return { ok: true }
})
