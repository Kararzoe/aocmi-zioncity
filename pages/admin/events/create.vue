<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Create Event</h2>
    <p v-if="err" class="text-red-500 mb-4">{{ err }}</p>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <input name="title" placeholder="Title" required class="w-full border p-3 rounded" />
      <textarea name="desc" placeholder="Description" required rows="4" class="w-full border p-3 rounded" />
      <input name="date_of_event" type="date" required class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1">Event Image</label>
        <input name="img" type="file" accept="image/*" required class="w-full" />
      </div>
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Saving...' : 'Save Event' }}
      </button>
      <p v-if="err" class="text-red-500 text-sm">{{ err }}</p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const err = ref('')
const loading = ref(false)

const submit = async (e) => {
  loading.value = true
  err.value = ''
  try {
    await $fetch('/api/events', { method: 'POST', body: new FormData(e.target) })
    await navigateTo('/admin/events')
  } catch (e) { err.value = e.data?.message || 'Failed to create event' }
  loading.value = false
}
useHead({ title: 'Create Event' })
</script>
