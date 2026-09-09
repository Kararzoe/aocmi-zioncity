<template>
  <footer class="bg-[#0a1128] text-white">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid md:grid-cols-4 gap-10">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img src="/img/logo.png" alt="AOCMI" class="h-16" />
            <div>
              <p class="font-bold text-xl leading-tight">AOCMI</p>
              <p class="text-white/50 text-xs">Zion City</p>
            </div>
          </div>
          <p class="text-white/60 text-sm leading-relaxed mb-4">
            Ambassador of Christ Ministries International — devoted to expository preaching and teaching of God's word.
          </p>
          <div class="flex gap-3">
            <a v-for="s in socials" :key="s.icon" :href="s.href" target="_blank"
              class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition" :title="s.label">
              <i :class="`fab ${s.icon} text-sm`" />
            </a>
          </div>
        </div>
        <div>
          <h4 class="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">Quick Links</h4>
          <ul class="space-y-2.5">
            <li v-for="l in quickLinks" :key="l.href">
              <NuxtLink :to="l.href" class="text-white/60 text-sm hover:text-white transition">{{ l.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">Connect</h4>
          <ul class="space-y-2.5">
            <li v-for="l in connectLinks" :key="l.href">
              <NuxtLink :to="l.href" class="text-white/60 text-sm hover:text-white transition">{{ l.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">Contact Us</h4>
          <div class="space-y-3 text-sm text-white/60">
            <p class="flex items-start gap-2"><i class="fas fa-phone mt-1 text-xs" /> +234 902 729 3178</p>
            <p class="flex items-start gap-2"><i class="fas fa-envelope mt-1 text-xs" /> hello@aocmi.com</p>
            <p class="flex items-start gap-2"><i class="fas fa-map-marker-alt mt-1 text-xs" /> Jos, Plateau State, Nigeria</p>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 py-4 text-xs text-white/40">
        <p>&copy; {{ new Date().getFullYear() }} AOCMI Zion City. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const quickLinks = [
  { href: '/about-us', label: 'About Us' },
  { href: '/our-messages', label: 'Messages' },
  { href: '/events', label: 'Events' },
  { href: '/our-music', label: 'Music' },
  { href: '/store', label: 'Store' },
]
const connectLinks = [
  { href: '/givings', label: 'Givings' },
  { href: '/healing-school', label: 'Healing School' },
  { href: '/prayer-request', label: 'Prayer Request' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/live', label: 'Watch Live' },
]
const socials = [
  { href: 'https://youtube.com/@aocmizioncity', icon: 'fa-youtube', label: 'YouTube' },
  { href: 'https://instagram.com/aocmizioncity', icon: 'fa-instagram', label: 'Instagram' },
  { href: 'https://www.facebook.com/aocmizioncity', icon: 'fa-facebook', label: 'Facebook' },
  { href: 'https://twitter.com/aocmizioncity', icon: 'fa-twitter', label: 'Twitter' },
  { href: 'https://wa.me/+2349027293178', icon: 'fa-whatsapp', label: 'WhatsApp' },
]
</script>
