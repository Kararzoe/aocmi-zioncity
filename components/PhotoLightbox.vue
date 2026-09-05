<template>
  <div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div v-for="(src, i) in images" :key="src" @click="open(i)"
        class="overflow-hidden rounded-xl shadow-sm group cursor-pointer">
        <img :src="src" alt="Gallery" class="w-full h-36 md:h-44 object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
    </div>
    <div v-if="current !== null" class="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4" @click.self="current = null">
      <button @click="current = null" class="absolute top-4 right-4 text-white text-2xl"><i class="fas fa-times" /></button>
      <button @click="prev" class="absolute left-4 text-white text-2xl"><i class="fas fa-chevron-left" /></button>
      <img :src="images[current]" class="max-h-[90vh] max-w-[90vw] rounded-xl object-contain" />
      <button @click="next" class="absolute right-4 text-white text-2xl"><i class="fas fa-chevron-right" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ images: string[] }>()
const current = ref<number | null>(null)
const open = (i: number) => { current.value = i }
const prev = () => { current.value = ((current.value ?? 0) - 1 + props.images.length) % props.images.length }
const next = () => { current.value = ((current.value ?? 0) + 1) % props.images.length }
</script>
