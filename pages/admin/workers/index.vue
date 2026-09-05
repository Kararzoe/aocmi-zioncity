<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Workers ({{ workers.length }})</h2>
      <NuxtLink to="/admin/workers/create" class="bg-primary text-white px-4 py-2 rounded">Add Worker</NuxtLink>
    </div>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Phone</th>
            <th class="p-3 text-left">Unit</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="w in workers" :key="w.id" class="border-t">
            <td class="p-3">{{ w.name }}</td>
            <td class="p-3">{{ w.email }}</td>
            <td class="p-3">{{ w.phone }}</td>
            <td class="p-3">{{ w.unit }}</td>
            <td class="p-3">
              <button @click="del(w.id)" class="text-red-500 text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!workers.length" class="p-4 text-gray-400">No workers yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success, error } = useToast()
const { data, refresh } = await useFetch('/api/workers')
const workers = computed(() => data.value?.workers || [])

const del = async (id) => {
  if (!confirm('Delete this worker?')) return
  try {
    await $fetch(`/api/workers/${id}`, { method: 'DELETE' })
    success('Deleted')
    refresh()
  } catch { error('Failed') }
}
useHead({ title: 'Admin — Workers' })
</script>
