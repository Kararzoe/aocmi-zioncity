<template>
  <div v-if="pages > 1" class="flex justify-center gap-2 mt-10">
    <NuxtLink v-for="i in pages" :key="i" :to="{ query: { ...route.query, page: i } }"
      :class="['w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition', current === i ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
      {{ i }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ pages: number; current: number }>()
const route = useRoute()
</script>
