<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Our Celestial Harbinger</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">APOKALUPSIS</h1>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
        <img src="/img/apokalopsis.png" alt="Apokalupsis" class="rounded-2xl w-full shadow-xl" />
        <img src="/img/apokalupsis-account.jpg" alt="Apokalupsis Account" class="rounded-2xl w-full shadow-xl" />
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
useHead({ title: 'Apokalupsis — Devotionals' })
</script>
