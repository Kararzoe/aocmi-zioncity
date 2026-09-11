<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Add News / Event</h2>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <div>
        <label class="block text-sm mb-1 font-medium">Type</label>
        <select name="type" class="w-full border p-3 rounded">
          <option value="news">News</option>
          <option value="event">Event</option>
          <option value="program">Program</option>
          <option value="fast">Fast</option>
        </select>
      </div>
      <input name="title" placeholder="Title" required class="w-full border p-3 rounded" />
      <textarea name="body" placeholder="Body / Description" required rows="5" class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1 font-medium">Event Date <span class="text-gray-400 font-normal">(for calendar — optional)</span></label>
        <input name="eventDate" type="datetime-local" class="w-full border p-3 rounded" />
      </div>
      <input name="link" placeholder="External link (optional)" class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1 font-medium">Image (optional)</label>
        <input name="img" type="file" accept="image/*" class="w-full" />
      </div>
      <p class="text-xs text-gray-400">📲 A push notification will be sent to all subscribers automatically.</p>
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Saving...' : 'Save & Notify' }}
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
    await $fetch('/api/news', { method: 'POST', body: new FormData(e.target) })
    await navigateTo('/admin/news')
  } catch (e) { err.value = e.data?.message || 'Failed to save' }
  loading.value = false
}
useHead({ title: 'Add News / Event' })
</script>
