<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Upcoming & Past</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Events</h1>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="mb-12">
        <div class="text-center mb-8">
          <span class="purple-text">Watch</span>
          <h2 class="section-title mt-2">Event Highlights</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <video src="/videos/video_2026-03-16_21-49-23.mp4" controls loop playsinline class="rounded-2xl w-full shadow-xl" />
            <p class="text-center text-sm font-semibold mt-3">Afro Gospel Sunday</p>
          </div>
        </div>
      </div>
      <form class="max-w-lg mx-auto mb-10 flex gap-2" @submit.prevent="doSearch">
        <input v-model="searchInput" placeholder="Search events..."
          class="flex-1 border border-gray-200 p-3.5 rounded-full text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <button class="btn-blue text-sm">Search</button>
      </form>
      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink v-for="e in events" :key="e.id" :to="`/events/${e.slug}`" class="messages-link group">
          <div class="card-hover bg-white">
            <div class="overflow-hidden relative">
              <img :src="`/uploads/events/${e.image}`" :alt="e.title"
                class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1a237e]">
                {{ e.dateOfEvent }}
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-bold mb-2">{{ e.title }}</h3>
              <span class="text-[#1a237e] text-xs font-semibold group-hover:underline">View Details →</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <p v-if="!events.length" class="text-center text-gray-400 mt-8">No events found.</p>
      <Pagination :pages="pages" :current="page" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const searchInput = ref(route.query.search || '')
const page = computed(() => parseInt(route.query.page || '1'))

const { data } = await useFetch(() => `/api/events?page=${page.value}&search=${route.query.search || ''}`)
const events = computed(() => data.value?.events || [])
const pages = computed(() => data.value?.pages || 1)

const doSearch = () => router.push({ query: { search: searchInput.value, page: 1 } })
</script>
