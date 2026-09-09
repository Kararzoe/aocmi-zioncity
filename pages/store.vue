<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Resources</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Store</h1>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <section class="mb-16">
        <div class="text-center mb-10">
          <span class="purple-text">Library</span>
          <h2 class="section-title mt-2">Books</h2>
        </div>
        <div class="mb-10">
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-book text-[#1a237e]" /> Apokalupsis</h3>
          <div class="bg-gray-50 rounded-2xl p-6 text-center">
            <img src="/img/apokalopsis.png" alt="Apokalupsis" class="rounded-xl max-w-[200px] mx-auto mb-4" />
            <p class="text-gray-500 text-sm mb-4">Our celestial harbinger — devotional publications from AOCMI Zion City</p>
            <NuxtLink to="/devotionals" class="btn-blue text-sm inline-block">View Apokalupsis →</NuxtLink>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-book-open text-[#1a237e]" /> Dr. Prince Buma's Books</h3>
          <div class="bg-gray-50 rounded-2xl p-8 text-center">
            <div class="w-16 h-16 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-book text-[#1a237e] text-2xl" />
            </div>
            <p class="text-gray-500">Will be available soon</p>
          </div>
        </div>
      </section>
      <section class="mb-16">
        <div class="text-center mb-10">
          <span class="purple-text">Ministries</span>
          <h2 class="section-title mt-2">Ministries Materials</h2>
          <p class="text-gray-500 text-sm mt-2">Shirts, caps, crests and more</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="s in stores" :key="s.id" class="card-hover bg-white group">
            <div class="overflow-hidden">
              <img :src="s.img" :alt="s.title" class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-5">
              <h3 class="font-bold text-sm mb-3">{{ s.title }}</h3>
              <a :href="s.linkToResource" target="_blank" class="text-[#1a237e] text-xs font-semibold hover:underline">Get Item →</a>
            </div>
          </div>
        </div>
        <p v-if="!stores.length" class="text-center text-gray-400 mt-4">No materials available yet. Check back soon!</p>
      </section>
    </div>
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/store')
const stores = computed(() => data.value?.stores || [])
useHead({ title: 'Store' })
</script>
