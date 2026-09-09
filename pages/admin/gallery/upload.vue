<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Upload Photos</h2>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <input name="title" placeholder="Title / Caption" required class="w-full border p-3 rounded" />
      <select name="category" class="w-full border p-3 rounded">
        <option value="general">General</option>
        <option value="service">Service</option>
        <option value="event">Event</option>
        <option value="outreach">Outreach</option>
      </select>
      <div>
        <label class="block text-sm mb-1">Photos (multiple allowed)</label>
        <input name="photos" type="file" accept="image/*" multiple required class="w-full" />
      </div>
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Uploading...' : 'Upload' }}
      </button>
      <p v-if="err" class="text-red-500 text-sm">{{ err }}</p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const loading = ref(false)
const err = ref('')

const submit = async (e) => {
  loading.value = true
  err.value = ''
  try {
    await $fetch('/api/gallery', { method: 'POST', body: new FormData(e.target) })
    await navigateTo('/admin/gallery')
  } catch (e) {
    err.value = e.data?.message || 'Upload failed'
    loading.value = false
  }
}
useHead({ title: 'Upload Photos' })
</script>
