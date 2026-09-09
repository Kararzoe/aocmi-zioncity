<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Word of the Year</h2>
    <div v-if="current" class="bg-white p-4 rounded-lg shadow mb-6 max-w-xl">
      <img :src="current.img" class="w-full rounded-lg" />
    </div>
    <p v-else class="text-gray-400 mb-6">No word of the year set yet.</p>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <p class="text-sm text-gray-500">Submitting will replace the current word of the year.</p>
      <div>
        <label class="block text-sm mb-1">Image</label>
        <input name="img" type="file" accept="image/*" required class="w-full" />
      </div>
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <p v-if="success" class="text-green-600 text-sm">Saved successfully!</p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const loading = ref(false)
const { data: current, refresh } = await useFetch('/api/word-of-the-year')

const error = ref('')
const success = ref(false)

const submit = async (e) => {
  loading.value = true
  error.value = ''
  success.value = false
  try {
    await $fetch('/api/word-of-the-year', { method: 'POST', body: new FormData(e.target) })
    success.value = true
    refresh()
  } catch (err) {
    error.value = err?.data?.message || err?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
useHead({ title: 'Admin — Word of the Year' })
</script>
