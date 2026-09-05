<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Salvation Entries</h2>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Phone</th>
            <th class="p-3 text-left">Location</th>
            <th class="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in contacts" :key="c.id" class="border-t">
            <td class="p-3">{{ c.fullname }}</td>
            <td class="p-3">{{ c.email }}</td>
            <td class="p-3">{{ c.phone }}</td>
            <td class="p-3">{{ c.location }}</td>
            <td class="p-3">{{ new Date(c.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!contacts.length" class="p-4 text-gray-400">No entries yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

// Fetch directly via server route
const { data } = await useFetch('/api/salvation-entries')
const contacts = computed(() => data.value?.contacts || [])
useHead({ title: 'Admin — Salvation Entries' })
</script>
