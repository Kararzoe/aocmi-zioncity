<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Music</h2>
      <NuxtLink to="/admin/music/create" class="bg-primary text-white px-4 py-2 rounded">Upload Music</NuxtLink>
    </div>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in musics" :key="m.id" class="border-t">
            <td class="p-3">{{ m.title }}</td>
            <td class="p-3">{{ new Date(m.createdAt).toLocaleDateString() }}</td>
            <td class="p-3">
              <button @click="del(m.slug)" class="text-red-500 text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!musics.length" class="p-4 text-gray-400">No music yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success, error } = useToast()
const { data, refresh } = await useFetch('/api/music')
const musics = computed(() => data.value?.musics || [])

const del = async (slug) => {
  if (!confirm('Delete this track?')) return
  try {
    await $fetch(`/api/music/${slug}`, { method: 'DELETE' })
    success('Deleted')
    refresh()
  } catch { error('Failed') }
}
useHead({ title: 'Admin — Music' })
</script>
