<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Sermon Series</h2>
    <form @submit.prevent="create" class="bg-white p-4 rounded-lg shadow mb-6 flex gap-3 max-w-xl">
      <input v-model="title" placeholder="Series title" required class="flex-1 border p-3 rounded" />
      <button :disabled="loading" class="bg-primary text-white px-4 py-2 rounded disabled:opacity-50">
        {{ loading ? '...' : 'Add' }}
      </button>
    </form>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Messages</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in series" :key="s.id" class="border-t">
            <td class="p-3">{{ s.title }}</td>
            <td class="p-3">{{ s._count.messages }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!series.length" class="p-4 text-gray-400">No series yet.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const title = ref('')
const loading = ref(false)
const { data, refresh } = await useFetch('/api/sermon-series')
const series = computed(() => data.value?.series || [])

const create = async () => {
  loading.value = true
  await $fetch('/api/sermon-series', { method: 'POST', body: { title: title.value } })
  title.value = ''
  loading.value = false
  refresh()
}
useHead({ title: 'Admin — Sermon Series' })
</script>
