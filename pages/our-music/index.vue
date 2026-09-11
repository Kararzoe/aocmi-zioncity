<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Worship</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Our Music</h1>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <form class="max-w-lg mx-auto mb-10 flex gap-2" @submit.prevent="doSearch">
        <input v-model="searchInput" placeholder="Search music..."
          class="flex-1 border border-gray-200 p-3.5 rounded-full text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <button class="btn-blue text-sm">Search</button>
      </form>
      <div class="grid md:grid-cols-4 gap-6">
        <NuxtLink v-for="m in musics" :key="m.id" :to="`/our-music/${m.slug}`" class="messages-link group">
          <div class="card-hover bg-white">
            <div class="overflow-hidden relative">
              <img :src="m.img" :alt="m.title"
                class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div class="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <i class="fas fa-play text-[#1a237e] ml-1" />
                </div>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-bold text-sm mb-1">{{ m.title }}</h3>
              <p class="text-xs text-gray-400">{{ m.desc.length > 50 ? m.desc.slice(0, 50) + '...' : m.desc }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <p v-if="!musics.length" class="text-center text-gray-400 mt-8">No music found.</p>
      <Pagination :pages="pages" :current="page" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const searchInput = ref(route.query.search || '')
const page = computed(() => parseInt(route.query.page || '1'))

const { data } = useFetch(() => `/api/music?page=${page.value}&search=${route.query.search || ''}`)
const musics = computed(() => data.value?.musics || [])
const pages = computed(() => data.value?.pages || 1)

const doSearch = () => router.push({ query: { search: searchInput.value, page: 1 } })
</script>
