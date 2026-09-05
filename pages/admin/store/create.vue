<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Add Store Item</h2>
    <p v-if="err" class="text-red-500 mb-4">{{ err }}</p>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <input name="title" placeholder="Title" required class="w-full border p-3 rounded" />
      <input name="link" placeholder="Link to resource" required class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1">Image</label>
        <input name="img" type="file" accept="image/*" required class="w-full" />
      </div>
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Saving...' : 'Save Item' }}
      </button>
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
    await $fetch('/api/store', { method: 'POST', body: new FormData(e.target) })
    await navigateTo('/admin/store')
  } catch (e) { err.value = e.data?.message || 'Failed' }
  loading.value = false
}
useHead({ title: 'Add Store Item' })
</script>
