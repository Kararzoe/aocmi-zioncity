<template>
  <div>
    <div class="grid md:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">{{ stat.label }}</h3>
        <p class="text-3xl font-bold">{{ stat.value }}</p>
        <span v-if="stat.badge" class="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{{ stat.badge }} new</span>
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="font-bold mb-4">Recent Messages</h3>
        <div v-for="m in data?.messages" :key="m.id" class="border-b py-2 text-sm">
          {{ m.title }} — {{ new Date(m.createdAt).toLocaleDateString() }}
        </div>
        <p v-if="!data?.messages?.length" class="text-gray-400">No messages yet.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="font-bold mb-4">Recent Events</h3>
        <div v-for="e in data?.events" :key="e.id" class="border-b py-2 text-sm">
          {{ e.title }} — {{ e.dateOfEvent }}
        </div>
        <p v-if="!data?.events?.length" class="text-gray-400">No events yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { data } = await useFetch('/api/dashboard')
const stats = computed(() => [
  { label: 'Healing School', value: data.value?.healingCount || 0 },
  { label: 'Salvation Entries', value: data.value?.salvationCount || 0 },
  { label: 'Prayer Requests', value: data.value?.prayerCount || 0, badge: data.value?.prayerCount > 0 ? data.value.prayerCount : null },
  { label: 'Newsletter Subscribers', value: data.value?.newsletterCount || 0 },
])
useHead({ title: 'Admin Dashboard' })
</script>
