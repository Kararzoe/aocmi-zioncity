<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Messages</h2>
      <NuxtLink to="/admin/messages/create" class="bg-primary text-white px-4 py-2 rounded">Add Message</NuxtLink>
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
          <tr v-for="m in messages" :key="m.id" class="border-t">
            <td class="p-3">{{ m.title }}</td>
            <td class="p-3">{{ new Date(m.createdAt).toLocaleDateString() }}</td>
            <td class="p-3 flex gap-2">
              <button @click="del(m.slug)" class="text-red-500 text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!messages.length" class="p-4 text-gray-400">No messages yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success, error } = useToast()
const { data, refresh } = await useFetch('/api/messages?page=1')
const messages = computed(() => data.value?.messages || [])

const del = async (slug) => {
  if (!confirm('Delete this message?')) return
  try {
    await $fetch(`/api/messages/${slug}`, { method: 'DELETE' })
    success('Message deleted')
    refresh()
  } catch { error('Failed to delete') }
}
useHead({ title: 'Admin — Messages' })
</script>
