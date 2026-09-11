<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">News</h2>
      <NuxtLink to="/admin/news/create" class="bg-primary text-white px-4 py-2 rounded">Add News</NuxtLink>
    </div>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Type</th>
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in news" :key="n.id" class="border-t">
            <td class="p-3">{{ n.title }}</td>
            <td class="p-3 capitalize">{{ n.type }}</td>
            <td class="p-3">{{ new Date(n.createdAt).toLocaleDateString() }}</td>
            <td class="p-3">
              <button @click="del(n.id)" class="text-red-500 text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!news.length" class="p-4 text-gray-400">No news yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success, error } = useToast()
const { data, refresh } = await useFetch('/api/news')
const news = computed(() => data.value?.news || [])

const del = async (id) => {
  if (!confirm('Delete this news item?')) return
  try {
    await $fetch(`/api/news/${id}`, { method: 'DELETE' })
    success('Deleted')
    refresh()
  } catch { error('Failed to delete') }
}
useHead({ title: 'Admin — News' })
</script>
