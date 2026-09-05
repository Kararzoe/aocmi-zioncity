<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <h2 class="text-2xl font-bold">Prayer Requests</h2>
      <span v-if="unread > 0" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{{ unread }} new</span>
    </div>
    <div class="space-y-4">
      <div v-for="r in requests" :key="r.id"
        :class="['bg-white p-4 rounded-lg shadow', !r.isRead ? 'border-l-4 border-primary' : '']">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold">{{ r.fullname }}</h3>
            <p class="text-sm text-gray-500">{{ r.email }} {{ r.phone ? `• ${r.phone}` : '' }}</p>
            <p class="text-sm text-gray-400">{{ new Date(r.createdAt).toLocaleString() }}</p>
          </div>
          <div class="flex gap-2">
            <button v-if="!r.isRead" @click="markRead(r.id)" class="text-blue-600 text-xs">Mark Read</button>
            <button @click="del(r.id)" class="text-red-500 text-xs">Delete</button>
          </div>
        </div>
        <p class="mt-3 text-gray-700 bg-gray-50 p-3 rounded">{{ r.request }}</p>
      </div>
    </div>
    <p v-if="!requests.length" class="text-gray-400 mt-4">No prayer requests yet.</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { success } = useToast()
const { data, refresh } = await useFetch('/api/prayer-request')
const requests = computed(() => data.value?.requests || [])
const unread = computed(() => data.value?.unreadCount || 0)

const markRead = async (id) => {
  await $fetch(`/api/prayer-request/${id}`, { method: 'PATCH' })
  success('Marked as read')
  refresh()
}
const del = async (id) => {
  if (!confirm('Delete?')) return
  await $fetch(`/api/prayer-request/${id}`, { method: 'DELETE' })
  success('Deleted')
  refresh()
}
useHead({ title: 'Admin — Prayer Requests' })
</script>
