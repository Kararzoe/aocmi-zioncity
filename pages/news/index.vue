<template>
  <div class="max-w-6xl mx-auto px-4 py-16">
    <div class="text-center mb-10">
      <span class="purple-text">Latest Updates</span>
      <h1 class="text-3xl md:text-4xl font-bold mt-2">News & Updates</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="n in news" :key="n.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img v-if="n.image" :src="n.image" :alt="n.title" class="w-full h-48 object-cover" loading="lazy" />
        <div class="p-5">
          <p class="text-[10px] text-gray-400 mb-1">{{ new Date(n.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
          <h2 class="font-bold text-base mb-2">{{ n.title }}</h2>
          <p class="text-gray-500 text-sm leading-relaxed mb-3">{{ n.body.length > 150 ? n.body.slice(0, 150) + '...' : n.body }}</p>
          <a v-if="n.link" :href="n.link" target="_blank" class="text-[#1a237e] text-xs font-semibold hover:underline">Read More →</a>
        </div>
      </div>
    </div>
    <p v-if="!news.length" class="text-center text-gray-400 mt-10">No news yet. Check back soon.</p>
  </div>
</template>

<script setup>
const { data } = useFetch('/api/news')
const news = computed(() => data.value?.news || [])
useHead({ title: 'News & Updates — AOCMI Zion City' })
</script>
