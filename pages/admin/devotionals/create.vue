<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Add Devotional</h2>
    <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <input name="title" placeholder="Title" required class="w-full border p-3 rounded" />
      <input name="scripture" placeholder="Scripture (e.g. John 3:16)" class="w-full border p-3 rounded" />
      <textarea name="content" placeholder="Content" required rows="6" class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1">Cover Image (optional)</label>
        <input name="img" type="file" accept="image/*" class="w-full" />
      </div>
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Saving...' : 'Save Devotional' }}
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const error = ref('')
const loading = ref(false)

const submit = async (e) => {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/devotionals', { method: 'POST', body: new FormData(e.target) })
    await navigateTo('/admin/devotionals')
  } catch (err) {
    error.value = err.data?.message || 'Failed to save'
  }
  loading.value = false
}
useHead({ title: 'Admin — Add Devotional' })
</script>
