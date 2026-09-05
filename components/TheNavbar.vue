<template>
  <nav :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-[#0a1128]/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-3']">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
      <NuxtLink to="/" class="shrink-0">
        <img src="/img/logo.png" alt="AOCMI" class="h-10 md:h-12 w-auto" />
      </NuxtLink>

      <div class="hidden lg:flex items-center gap-8">
        <NuxtLink v-for="l in navLinks" :key="l.href" :to="l.href"
          :class="['text-[11px] uppercase tracking-wider font-medium transition-colors hover:text-white', route.path === l.href ? 'text-white' : 'text-white/70']">
          {{ l.label }}
        </NuxtLink>
      </div>

      <div class="hidden lg:flex items-center gap-3">
        <a v-for="s in socials" :key="s.icon" :href="s.href" target="_blank"
          class="text-white/60 hover:text-white transition-colors text-sm">
          <i :class="`fab ${s.icon}`" />
        </a>
      </div>

      <button class="lg:hidden text-white text-xl p-2" @click="open = !open">
        <i :class="`fas ${open ? 'fa-times' : 'fa-bars'}`" />
      </button>
    </div>

    <div v-if="open" class="lg:hidden bg-[#0a1128] border-t border-white/10 mt-2 absolute top-full left-0 right-0 z-50 shadow-2xl max-h-[80vh] overflow-y-auto">
      <div class="max-w-7xl mx-auto px-4 py-4 space-y-1">
        <NuxtLink v-for="l in navLinks" :key="l.href" :to="l.href"
          :class="['block py-2.5 px-3 rounded-lg text-sm transition-colors', route.path === l.href ? 'bg-white/10 text-white font-semibold' : 'text-white/80 hover:bg-white/5 hover:text-white']">
          {{ l.label }}
        </NuxtLink>
        <div class="pt-2">
          <button @click="mediaOpen = !mediaOpen"
            class="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-white/80 hover:bg-white/5">
            <span class="flex items-center gap-2"><i class="fas fa-photo-film text-xs" /> Media</span>
            <i :class="`fas fa-chevron-down text-[10px] transition-transform ${mediaOpen ? 'rotate-180' : ''}`" />
          </button>
          <div v-if="mediaOpen" class="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
            <NuxtLink v-for="l in mediaLinks" :key="l.href" :to="l.href"
              class="block py-2 px-3 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white">
              {{ l.label }}
            </NuxtLink>
          </div>
        </div>
        <div>
          <button @click="socialOpen = !socialOpen"
            class="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-white/80 hover:bg-white/5">
            <span class="flex items-center gap-2"><i class="fas fa-share-alt text-xs" /> Socials</span>
            <i :class="`fas fa-chevron-down text-[10px] transition-transform ${socialOpen ? 'rotate-180' : ''}`" />
          </button>
          <div v-if="socialOpen" class="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
            <a v-for="s in socials" :key="s.icon" :href="s.href" target="_blank"
              class="flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white">
              <i :class="`fab ${s.icon} w-4`" /> {{ s.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute()
const open = ref(false)
const mediaOpen = ref(false)
const socialOpen = ref(false)
const scrolled = ref(false)

watch(() => route.path, () => { open.value = false; mediaOpen.value = false; socialOpen.value = false })

onMounted(() => {
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 20 })
})

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-messages', label: 'Messages' },
  { href: '/givings', label: 'Givings' },
  { href: '/events', label: 'Events' },
  { href: '/healing-school', label: 'Healing School' },
  { href: '/store', label: 'Store' },
  { href: '/about-us', label: 'About Us' },
]
const mediaLinks = [
  { href: '/our-music', label: 'Music' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/devotionals', label: 'Apokalupsis' },
  { href: '/testimonies', label: 'Testimonies' },
]
const socials = [
  { href: 'https://youtube.com/@aocmizioncity', icon: 'fa-youtube', label: 'YouTube' },
  { href: 'https://www.facebook.com/aocmizioncity', icon: 'fa-facebook', label: 'Facebook' },
  { href: 'https://instagram.com/aocmizioncity', icon: 'fa-instagram', label: 'Instagram' },
  { href: 'https://twitter.com/aocmizioncity', icon: 'fa-twitter', label: 'Twitter' },
]
</script>
