<template>
  <div v-if="show" class="fixed bottom-0 left-0 right-0 z-50 bg-[#1a237e] text-white px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
    <div class="flex items-center gap-3">
      <img src="/img/logo.png" class="w-10 h-10 rounded-xl" />
      <div>
        <p class="font-bold text-sm">Install AOCMI App</p>
        <p class="text-white/70 text-xs">Add to home screen for quick access</p>
      </div>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <button @click="install" class="bg-white text-[#1a237e] px-4 py-1.5 rounded-full text-xs font-bold">Install</button>
      <button @click="dismiss" class="text-white/50 hover:text-white text-lg leading-none">&times;</button>
    </div>
  </div>
</template>

<script setup>
const show = ref(false)
let deferredPrompt = null

onMounted(() => {
  // Show banner if not already dismissed
  const dismissed = sessionStorage.getItem('pwa-banner-dismissed')
  if (!dismissed) show.value = true

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
  })
})

const install = async () => {
  if (!deferredPrompt) return
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  if (outcome === 'accepted') show.value = false
  deferredPrompt = null
}

const dismiss = () => {
  show.value = false
  deferredPrompt = null
  sessionStorage.setItem('pwa-banner-dismissed', '1')
}
</script>
