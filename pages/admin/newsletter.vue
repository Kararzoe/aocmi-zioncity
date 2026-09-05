<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Newsletter Subscribers ({{ subscribers.length }})</h2>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in subscribers" :key="s.id" class="border-t">
            <td class="p-3">{{ s.email }}</td>
            <td class="p-3">{{ new Date(s.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!subscribers.length" class="p-4 text-gray-400">No subscribers yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const { data } = await useFetch('/api/newsletter')
const subscribers = computed(() => data.value?.subscribers || [])
useHead({ title: 'Admin — Newsletter' })
</script>
