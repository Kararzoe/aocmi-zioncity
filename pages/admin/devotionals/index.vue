<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Devotionals ({{ devotionals.length }})</h2>
      <NuxtLink to="/admin/devotionals/create" class="bg-primary text-white px-4 py-2 rounded">Add Devotional</NuxtLink>
    </div>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Scripture</th>
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in devotionals" :key="d.id" class="border-t">
            <td class="p-3">{{ d.title }}</td>
            <td class="p-3 text-gray-400">{{ d.scripture }}</td>
            <td class="p-3">{{ new Date(d.createdAt).toLocaleDateString() }}</td>
            <td class="p-3">
              <button @click="del(d.slug)" class="text-red-500 text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!devotionals.length" class="p-4 text-gray-400">No devotionals yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success, error } = useToast()
const { data, refresh } = await useFetch('/api/devotionals')
const devotionals = computed(() => data.value?.devotionals || [])

const del = async (slug) => {
  if (!confirm('Delete this devotional?')) return
  try {
    await $fetch(`/api/devotionals/${slug}`, { method: 'DELETE' })
    success('Deleted')
    refresh()
  } catch { error('Failed') }
}
useHead({ title: 'Admin — Devotionals' })
</script>
