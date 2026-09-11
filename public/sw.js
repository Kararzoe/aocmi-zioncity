const CACHE = 'aocmi-v2'

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ))
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const { request } = e
  const url = new URL(request.url)

  // Never intercept — just pass through everything
  if (
    request.method !== 'GET' ||
    url.pathname.startsWith('/api/') ||
    request.destination === 'document' ||
    url.pathname === '/'
  ) {
    return
  }

  // Cache-first only for images and nuxt chunks
  if (request.destination === 'image' || url.pathname.startsWith('/_nuxt/')) {
    e.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        const clone = res.clone()
        caches.open(CACHE).then(c => c.put(request, clone))
        return res
      }).catch(() => cached))
    )
  }
})
