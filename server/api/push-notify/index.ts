import webpush from 'web-push'
import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const config = useRuntimeConfig()
  const { title, body, url } = await readBody(event)

  webpush.setVapidDetails(config.vapidEmail, config.vapidPublicKey, config.vapidPrivateKey)

  const subs = await prisma.pushSubscription.findMany()
  const payload = JSON.stringify({ title, body, url: url || '/' })

  const results = await Promise.allSettled(
    subs.map(s =>
      webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload)
        .catch(async (err) => {
          if (err.statusCode === 410 || err.statusCode === 404) {
            await prisma.pushSubscription.delete({ where: { endpoint: s.endpoint } })
          }
        })
    )
  )

  const sent = results.filter(r => r.status === 'fulfilled').length
  return { ok: true, sent, total: subs.length }
})
