<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Our Celestial Harbinger</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">APOKALUPSIS</h1>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-12">

      <!-- Church Account Details -->
      <div class="max-w-xl mx-auto mb-12">
        <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-100" style="opacity:0;animation:slideUp 0.5s ease forwards">
          <div class="px-6 py-5 text-white flex items-center justify-between" style="background: linear-gradient(135deg, #00843D, #00a84f)">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i class="fas fa-university text-white" />
              </div>
              <div>
                <p class="text-xs text-white/70 uppercase tracking-widest">Church Account Details</p>
                <p class="font-bold text-lg">Sterling Bank</p>
              </div>
            </div>
            <div class="text-white/20 text-5xl font-black">SB</div>
          </div>
          <div class="bg-white px-6 py-5 space-y-3">
            <div class="flex justify-between items-center border-b border-gray-100 pb-3">
              <span class="text-gray-400 text-xs">Account Name</span>
              <span class="font-bold text-sm">AOCMI ZION CITY (APOKALUPSIS)</span>
            </div>
            <div class="flex justify-between items-center gap-3">
              <div>
                <p class="text-gray-400 text-xs mb-1">Naira Account</p>
                <p class="font-mono font-bold text-[#1a237e] text-xl tracking-widest">0512611610</p>
              </div>
              <button @click="copy('0512611610')" class="flex items-center gap-1.5 bg-gray-50 hover:bg-[#1a237e] hover:text-white text-gray-500 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 shrink-0">
                <i :class="copied ? 'fas fa-check text-green-500' : 'fas fa-copy'" />
                <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink v-for="d in devotionals" :key="d.id" :to="`/devotionals/${d.slug}`" class="messages-link group">
          <div class="card-hover bg-white">
            <div v-if="d.image" class="overflow-hidden">
              <img :src="d.image" :alt="d.title" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-5">
              <p v-if="d.scripture" class="text-xs text-[#7c3aed] font-semibold mb-2">{{ d.scripture }}</p>
              <h3 class="font-bold mb-2">{{ d.title }}</h3>
              <p class="text-xs text-gray-400">{{ new Date(d.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <p v-if="!devotionals.length" class="text-center text-gray-400 mt-8">No devotionals yet. Check back soon!</p>
    </div>
  </div>
</template>

<script setup>
const { data } = useFetch('/api/devotionals')
const devotionals = computed(() => data.value?.devotionals || [])
const copied = ref(false)
const copy = (text) => {
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
useHead({ title: 'Apokalupsis — Devotionals' })
</script>

<style scoped>
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
