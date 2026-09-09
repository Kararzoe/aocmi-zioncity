<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Add Worker</h2>
    <p v-if="err" class="text-red-500 mb-4">{{ err }}</p>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <input v-model="form.name" placeholder="Full Name" required class="w-full border p-3 rounded" />
      <input v-model="form.email" type="email" placeholder="Email" required class="w-full border p-3 rounded" />
      <input v-model="form.phone" placeholder="Phone" required class="w-full border p-3 rounded" />
      <input v-model="form.address" placeholder="Address" required class="w-full border p-3 rounded" />
      <input v-model="form.unit" placeholder="Unit/Department" required class="w-full border p-3 rounded" />
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Saving...' : 'Save Worker' }}
      </button>
      <p v-if="err" class="text-red-500 text-sm">{{ err }}</p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const form = reactive({ name: '', email: '', phone: '', address: '', unit: '' })
const err = ref('')
const loading = ref(false)

const submit = async () => {
  loading.value = true
  err.value = ''
  try {
    await $fetch('/api/workers', { method: 'POST', body: { ...form } })
    await navigateTo('/admin/workers')
  } catch (e) { err.value = e.data?.message || 'Failed' }
  loading.value = false
}
useHead({ title: 'Add Worker' })
</script>
