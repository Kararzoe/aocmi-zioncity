<template>
  <div v-if="announcement" class="bg-[#1a237e] text-white text-xs py-2 px-4 text-center animate-slide-in-up relative">
    <span>{{ announcement.text }}</span>
    <a v-if="announcement.link" :href="announcement.link" target="_blank" class="ml-2 underline">Learn more</a>
    <button @click="announcement = null" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
      <i class="fas fa-times text-xs" />
    </button>
  </div>
</template>

<script setup>
const announcement = ref(null)
const { data } = await useFetch('/api/announcements')
if (data.value?.announcements?.length) announcement.value = data.value.announcements[0]
</script>
