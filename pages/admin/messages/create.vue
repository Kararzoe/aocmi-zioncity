<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Create Message</h2>
    <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <input name="title" placeholder="Title" required class="w-full border p-3 rounded" />
      <textarea name="desc" placeholder="Description" required rows="4" class="w-full border p-3 rounded" />
      <input name="link" placeholder="Link (e.g. download URL)" required class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1">Sermon Series (optional)</label>
        <select name="seriesId" class="w-full border p-3 rounded">
          <option value="">— No Series —</option>
          <option v-for="s in series" :key="s.id" :value="s.id">{{ s.title }}</option>
        </select>
      </div>
      <input name="seriesOrder" type="number" placeholder="Order in series (e.g. 1, 2, 3)" class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1">Cover Image</label>
        <input name="img" type="file" accept="image/*" required class="w-full" />
      </div>
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Saving...' : 'Save Message' }}
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const error = ref('')
const loading = ref(false)
const { data: seriesData } = await useFetch('/api/sermon-series')
const series = computed(() => seriesData.value?.series || [])

const submit = async (e) => {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/messages', { method: 'POST', body: new FormData(e.target) })
    await navigateTo('/admin/messages')
  } catch (err) {
    error.value = err.data?.message || 'Failed to create message'
  }
  loading.value = false
}
useHead({ title: 'Create Message' })
</script>
