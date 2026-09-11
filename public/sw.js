const CACHE = 'aocmi-v1'
const STATIC = [
  '/',
  '/our-messages',
  '/givings',
  '/about-us',
  '/img/logo.png',
]

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ))
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const { request } = e
  const url = new URL(request.url)

  // Skip non-GET and API requests — always network
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return e.respondWith(fetch(request))
  }

  // Cache-first for images and static assets
  if (request.destination === 'image' || url.pathname.startsWith('/_nuxt/') || url.pathname.startsWith('/img/')) {
    return e.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        const clone = res.clone()
        caches.open(CACHE).then(c => c.put(request, clone))
        return res
      }))
    )
  }

  // Network-first for everything else
  e.respondWith(
    fetch(request).catch(() => caches.match(request))
  )
})
