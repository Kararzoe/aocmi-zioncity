<template>
  <div>
    <!-- Main banner -->
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

    <!-- iOS instruction popup -->
    <div v-if="showIosGuide" class="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl p-5 border-t border-gray-100">
      <div class="flex justify-between items-center mb-3">
        <p class="font-bold text-sm text-gray-800">Add to Home Screen</p>
        <button @click="showIosGuide = false" class="text-gray-400 text-xl leading-none">&times;</button>
      </div>
      <ol class="text-sm text-gray-600 space-y-2">
        <li class="flex items-start gap-2">
          <span class="bg-[#1a237e] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
          Tap the <strong class="mx-1">Share</strong> button
          <svg class="w-4 h-4 mt-0.5 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l-4 4h3v7h2V6h3L12 2zm-7 13v5h14v-5h-2v3H7v-3H5z"/></svg>
          at the bottom of Safari
        </li>
        <li class="flex items-start gap-2">
          <span class="bg-[#1a237e] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
          Scroll down and tap <strong class="ml-1">Add to Home Screen</strong>
        </li>
        <li class="flex items-start gap-2">
          <span class="bg-[#1a237e] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
          Tap <strong class="ml-1">Add</strong> in the top right corner
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
const show = ref(false)
const showIosGuide = ref(false)
let deferredPrompt = null

const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios/i.test(navigator.userAgent)
const isInStandaloneMode = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone

onMounted(() => {
  if (isInStandaloneMode()) return // already installed
  const dismissed = sessionStorage.getItem('pwa-banner-dismissed')
  if (!dismissed) show.value = true

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
  })
})

const install = async () => {
  if (isIos()) {
    show.value = false
    showIosGuide.value = true
    return
  }
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') dismiss()
    deferredPrompt = null
  }
}

const dismiss = () => {
  show.value = false
  showIosGuide.value = false
  sessionStorage.setItem('pwa-banner-dismissed', '1')
}
</script>
