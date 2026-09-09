<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Givings / Bank Details</h2>
    <div v-if="current" class="bg-white p-4 rounded-lg shadow mb-6 max-w-xl space-y-2">
      <p class="font-bold">{{ current.phone }}</p>
      <p class="text-gray-500 text-sm">{{ current.email }}</p>
      <div class="grid grid-cols-2 gap-3 mt-2 text-sm">
        <div v-if="current.bank1Name">
          <p class="font-semibold">{{ current.bank1Name }}</p>
          <p>{{ current.bank1AccountName }}</p>
          <p class="font-mono">{{ current.bank1AccountNumber }}</p>
        </div>
        <div v-if="current.bank2Name">
          <p class="font-semibold">{{ current.bank2Name }}</p>
          <p>{{ current.bank2AccountName }}</p>
          <p class="font-mono">{{ current.bank2AccountNumber }}</p>
        </div>
      </div>
      <div class="flex gap-3 mt-2">
        <img v-if="current.image1" :src="current.image1" class="w-32 h-20 object-cover rounded" />
        <img v-if="current.image2" :src="current.image2" class="w-32 h-20 object-cover rounded" />
      </div>
    </div>
    <p v-else class="text-gray-400 mb-6">No givings details set yet.</p>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
      <p class="text-sm text-gray-500">Submitting will replace the current givings details.</p>
      <input name="phone" placeholder="Contact Phone e.g. +234 902 729 3178" required class="w-full border p-3 rounded" />
      <input name="email" placeholder="Contact Email" required class="w-full border p-3 rounded" />
      <hr />
      <p class="font-semibold text-sm">Bank Account 1</p>
      <input name="bank1Name" placeholder="Bank Name e.g. GTBank" class="w-full border p-3 rounded" />
      <input name="bank1AccountName" placeholder="Account Name" class="w-full border p-3 rounded" />
      <input name="bank1AccountNumber" placeholder="Account Number" class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1">Bank Account Image 1 (optional)</label>
        <input name="image1" type="file" accept="image/*" class="w-full" />
      </div>
      <hr />
      <p class="font-semibold text-sm">Bank Account 2</p>
      <input name="bank2Name" placeholder="Bank Name e.g. Zenith Bank" class="w-full border p-3 rounded" />
      <input name="bank2AccountName" placeholder="Account Name" class="w-full border p-3 rounded" />
      <input name="bank2AccountNumber" placeholder="Account Number" class="w-full border p-3 rounded" />
      <div>
        <label class="block text-sm mb-1">Bank Account Image 2 (optional)</label>
        <input name="image2" type="file" accept="image/*" class="w-full" />
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
const error = ref('')
const success = ref(false)
const { data: current, refresh } = await useFetch('/api/givings')

const submit = async (e) => {
  loading.value = true
  error.value = ''
  success.value = false
  try {
    await $fetch('/api/givings', { method: 'POST', body: new FormData(e.target) })
    success.value = true
    refresh()
    e.target.reset()
  } catch (err) {
    error.value = err?.data?.message || err?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
useHead({ title: 'Admin — Givings' })
</script>
