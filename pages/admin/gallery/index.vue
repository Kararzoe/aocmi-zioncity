<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Gallery ({{ photos.length }})</h2>
      <NuxtLink to="/admin/gallery/upload" class="bg-primary text-white px-4 py-2 rounded">Upload Photos</NuxtLink>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="p in photos" :key="p.id" class="bg-white rounded-lg shadow overflow-hidden">
        <img :src="p.img" :alt="p.title" class="w-full h-32 object-cover" />
        <div class="p-2">
          <p class="text-sm font-medium truncate">{{ p.title }}</p>
          <p class="text-xs text-gray-400">{{ p.category }}</p>
          <button @click="del(p.id)" class="text-red-500 text-xs mt-1">Delete</button>
        </div>
      </div>
    </div>
    <p v-if="!photos.length" class="text-gray-400 mt-4">No photos uploaded yet.</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success, error } = useToast()
const { data, refresh } = await useFetch('/api/gallery')
const photos = computed(() => data.value?.photos || [])

const del = async (id) => {
  if (!confirm('Delete this photo?')) return
  try {
    await $fetch(`/api/gallery/${id}`, { method: 'DELETE' })
    success('Photo deleted')
    refresh()
  } catch { error('Failed') }
}
useHead({ title: 'Admin — Gallery' })
</script>
