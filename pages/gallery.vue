<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Pictorial Moments</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Live at AOCMI-ZIONCITY</h1>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <p v-if="!photos.length" class="text-center text-gray-400">No photos uploaded yet.</p>
      <PhotoLightbox v-else :images="photos.map(p => p.img)" />
    </div>
  </div>
</template>

<script setup>
const { data } = useFetch('/api/gallery')
const photos = computed(() => data.value?.photos || [])
useHead({ title: 'Gallery' })
</script>
