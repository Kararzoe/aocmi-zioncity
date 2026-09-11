<template>
  <div class="max-w-6xl mx-auto px-4 py-16">
    <div class="text-center mb-8">
      <span class="purple-text">Stay Updated</span>
      <h1 class="text-3xl md:text-4xl font-bold mt-2">News & Calendar</h1>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 justify-center mb-8 flex-wrap">
      <button v-for="t in tabs" :key="t.value" @click="activeTab = t.value"
        :class="['px-5 py-2 rounded-full text-xs font-semibold transition', activeTab === t.value ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
        {{ t.label }}
      </button>
    </div>

    <!-- Calendar view -->
    <div v-if="activeTab === 'calendar'" class="space-y-3">
      <div v-for="n in filtered" :key="n.id" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-start hover:shadow-md transition">
        <div class="shrink-0 bg-[#1a237e] text-white rounded-xl w-14 text-center py-2">
          <p class="text-lg font-black leading-none">{{ n.eventDate ? new Date(n.eventDate).getDate() : '—' }}</p>
          <p class="text-[10px] uppercase tracking-wide opacity-70">{{ n.eventDate ? new Date(n.eventDate).toLocaleDateString('en-US', { month: 'short' }) : '' }}</p>
        </div>
        <div class="flex-1">
          <span :class="['text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mr-2', typeStyle(n.type).badge]">{{ typeStyle(n.type).label }}</span>
          <h3 class="font-bold text-sm mt-1">{{ n.title }}</h3>
          <p class="text-gray-500 text-xs mt-1 leading-relaxed">{{ n.body.length > 120 ? n.body.slice(0, 120) + '...' : n.body }}</p>
          <a v-if="n.link" :href="n.link" target="_blank" class="text-[#1a237e] text-xs font-semibold hover:underline mt-1 inline-block">Details →</a>
        </div>
      </div>
      <p v-if="!filtered.length" class="text-center text-gray-400 py-10">No upcoming events. Check back soon.</p>
    </div>

    <!-- News/card view -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="n in filtered" :key="n.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
        <img v-if="n.image" :src="n.image" :alt="n.title" class="w-full h-48 object-cover" loading="lazy" />
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span :class="['text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full', typeStyle(n.type).badge]">{{ typeStyle(n.type).label }}</span>
            <p class="text-[10px] text-gray-400">{{ new Date(n.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
          </div>
          <h2 class="font-bold text-base mb-2">{{ n.title }}</h2>
          <p class="text-gray-500 text-sm leading-relaxed mb-3">{{ n.body.length > 150 ? n.body.slice(0, 150) + '...' : n.body }}</p>
          <a v-if="n.link" :href="n.link" target="_blank" class="text-[#1a237e] text-xs font-semibold hover:underline">Read More →</a>
        </div>
      </div>
      <p v-if="!filtered.length" class="col-span-3 text-center text-gray-400 py-10">Nothing here yet. Check back soon.</p>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  { label: 'All', value: 'all' },
  { label: 'News', value: 'news' },
  { label: 'Events', value: 'event' },
  { label: 'Programs', value: 'program' },
  { label: 'Fasts', value: 'fast' },
  { label: 'Calendar', value: 'calendar' },
]
const activeTab = ref('all')
const { data } = useFetch('/api/news')
const allNews = computed(() => data.value?.news || [])

const filtered = computed(() => {
  if (activeTab.value === 'all') return allNews.value
  if (activeTab.value === 'calendar') return [...allNews.value].filter(n => n.eventDate).sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
  return allNews.value.filter(n => n.type === activeTab.value)
})

const typeStyle = (type) => ({
  news:    { label: 'News',    badge: 'bg-blue-100 text-blue-700' },
  event:   { label: 'Event',   badge: 'bg-purple-100 text-purple-700' },
  program: { label: 'Program', badge: 'bg-green-100 text-green-700' },
  fast:    { label: 'Fast',    badge: 'bg-orange-100 text-orange-700' },
}[type] || { label: type, badge: 'bg-gray-100 text-gray-600' })

useHead({ title: 'News & Calendar — AOCMI Zion City' })
</script>
