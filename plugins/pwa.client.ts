export default defineNuxtPlugin(() => {
  if (!import.meta.client || !('serviceWorker' in navigator)) return

  const config = useRuntimeConfig()

  navigator.serviceWorker.register('/sw.js').then(async (reg) => {
    if (!('PushManager' in window)) return
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    let sub = await reg.pushManager.getSubscription()
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(config.public.vapidPublicKey),
      })
    }
    await $fetch('/api/push-subscribe', {
      method: 'POST',
      body: { endpoint: sub.endpoint, keys: { p256dh: arrayBufferToBase64(sub.getKey('p256dh')), auth: arrayBufferToBase64(sub.getKey('auth')) } },
    })
  }).catch(() => {})
})

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)))
}

function arrayBufferToBase64(buffer: ArrayBuffer | null) {
  if (!buffer) return ''
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
}
