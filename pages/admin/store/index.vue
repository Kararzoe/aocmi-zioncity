<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Store</h2>
      <NuxtLink to="/admin/store/create" class="bg-primary text-white px-4 py-2 rounded">Add Item</NuxtLink>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="s in stores" :key="s.id" class="bg-white rounded-lg shadow overflow-hidden">
        <img :src="s.img" :alt="s.title" class="w-full h-32 object-cover" />
        <div class="p-3">
          <p class="text-sm font-medium truncate">{{ s.title }}</p>
          <button @click="del(s.id)" class="text-red-500 text-xs mt-1">Delete</button>
        </div>
      </div>
    </div>
    <p v-if="!stores.length" class="text-gray-400 mt-4">No items yet.</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success, error } = useToast()
const { data, refresh } = await useFetch('/api/store')
const stores = computed(() => data.value?.stores || [])

const del = async (id) => {
  if (!confirm('Delete this item?')) return
  try {
    await $fetch(`/api/store/${id}`, { method: 'DELETE' })
    success('Deleted')
    refresh()
  } catch { error('Failed') }
}
useHead({ title: 'Admin — Store' })
</script>
