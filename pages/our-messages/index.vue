<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Listen & Learn</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Our Messages</h1>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="text-center mb-6">
        <a href="https://t.me/zioncitymessages" target="_blank" class="btn-blue text-sm inline-flex items-center gap-2">
          <i class="fab fa-telegram" /> Download Messages on Telegram
        </a>
      </div>
      <form class="max-w-lg mx-auto mb-6 flex gap-2" @submit.prevent="doSearch">
        <input v-model="searchInput" placeholder="Search messages..."
          class="flex-1 border border-gray-200 p-3.5 rounded-full text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <button class="btn-blue text-sm">Search</button>
      </form>
      <div v-if="allSeries.length" class="flex flex-wrap justify-center gap-2 mb-10">
        <NuxtLink to="/our-messages"
          :class="['px-4 py-2 rounded-full text-sm font-medium transition', !route.query.series ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">All</NuxtLink>
        <NuxtLink v-for="s in allSeries" :key="s.id" :to="`/our-messages?series=${s.slug}`"
          :class="['px-4 py-2 rounded-full text-sm font-medium transition', route.query.series === s.slug ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
          {{ s.title }} ({{ s._count.messages }})
        </NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <a v-for="m in messages" :key="m.id" :href="m.link" target="_blank" class="messages-link group">
          <div class="card-hover bg-white">
            <div class="overflow-hidden">
              <img :src="m.image" :alt="m.title"
                class="w-full h-32 md:h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-5">
              <span v-if="m.series" class="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full mb-2 inline-block">{{ m.series.title }}</span>
              <h3 class="font-bold text-sm mb-2">{{ m.title.length > 30 ? m.title.slice(0, 30) + '...' : m.title }}</h3>
              <p class="text-xs text-gray-400 mb-3">{{ new Date(m.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
              <span class="text-[#1a237e] text-xs font-semibold group-hover:underline">Listen Now →</span>
            </div>
          </div>
        </a>
      </div>
      <p v-if="!messages.length" class="text-center text-gray-400 mt-8">No messages found.</p>
      <Pagination :pages="pages" :current="page" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const searchInput = ref(route.query.search || '')
const page = computed(() => parseInt(route.query.page || '1'))

const { data: seriesData } = useFetch('/api/sermon-series')
const allSeries = computed(() => seriesData.value?.series || [])

const { data } = useFetch(() => `/api/messages?page=${page.value}&search=${route.query.search || ''}&series=${route.query.series || ''}`)
const messages = computed(() => data.value?.messages || [])
const pages = computed(() => data.value?.pages || 1)

const doSearch = () => router.push({ query: { ...route.query, search: searchInput.value, page: 1 } })
</script>
