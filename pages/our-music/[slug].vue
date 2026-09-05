<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <h1 class="text-3xl md:text-4xl font-bold mt-2">{{ music?.title }}</h1>
    </div>
    <div v-if="music" class="max-w-2xl mx-auto px-4 py-12">
      <img :src="`/uploads/music-cover-arts/${music.img}`" :alt="music.title" class="rounded-2xl w-full shadow-xl mb-6 max-h-80 object-cover" />
      <p class="text-gray-500 text-sm mb-6">{{ music.desc }}</p>
      <audio :src="`/uploads/music-tracks/${music.track}`" controls class="w-full mb-6" />
      <NuxtLink to="/our-music" class="text-[#1a237e] text-sm font-semibold hover:underline">← Back to Music</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: music } = await useFetch(`/api/music/${route.params.slug}`)
if (!music.value) throw createError({ statusCode: 404, message: 'Not found' })
useHead({ title: music.value?.title })
</script>
