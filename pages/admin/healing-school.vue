<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Healing School Entries ({{ entries.length }})</h2>
    <div class="space-y-4">
      <div v-for="e in entries" :key="e.id" class="bg-white p-4 rounded-lg shadow">
        <div class="grid md:grid-cols-2 gap-2 text-sm">
          <p><strong>Name:</strong> {{ e.fullname }}</p>
          <p><strong>Email:</strong> {{ e.email }}</p>
          <p><strong>Phone:</strong> {{ e.phone }}</p>
          <p><strong>State:</strong> {{ e.state }}, {{ e.city }}</p>
          <p class="md:col-span-2"><strong>Problem:</strong> {{ e.problem }}</p>
          <p class="md:col-span-2"><strong>Narration:</strong> {{ e.narration }}</p>
          <p class="text-gray-400 text-xs">{{ new Date(e.createdAt).toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <p v-if="!entries.length" class="text-gray-400 mt-4">No entries yet.</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { data } = await useFetch('/api/healing-school')
const entries = computed(() => data.value?.entries || [])
useHead({ title: 'Admin — Healing School' })
</script>
