<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Events</h2>
      <NuxtLink to="/admin/events/create" class="bg-primary text-white px-4 py-2 rounded">Add Event</NuxtLink>
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
          <tr v-for="e in events" :key="e.id" class="border-t">
            <td class="p-3">{{ e.title }}</td>
            <td class="p-3">{{ e.dateOfEvent }}</td>
            <td class="p-3">
              <button @click="del(e.slug)" class="text-red-500 text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!events.length" class="p-4 text-gray-400">No events yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success, error } = useToast()
const { data, refresh } = await useFetch('/api/events')
const events = computed(() => data.value?.events || [])

const del = async (slug) => {
  if (!confirm('Delete this event?')) return
  try {
    await $fetch(`/api/events/${slug}`, { method: 'DELETE' })
    success('Event deleted')
    refresh()
  } catch { error('Failed to delete') }
}
useHead({ title: 'Admin — Events' })
</script>
