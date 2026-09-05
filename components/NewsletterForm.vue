<template>
  <form @submit.prevent="submit" class="flex gap-2">
    <input v-model="email" type="email" placeholder="Your email address" required
      class="flex-1 px-4 py-2.5 rounded-full text-gray-800 text-sm outline-none focus:ring-2 focus:ring-white" />
    <button :disabled="loading" class="bg-white text-[#1a237e] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition disabled:opacity-50">
      {{ loading ? '...' : 'Subscribe' }}
    </button>
  </form>
  <p v-if="msg" class="text-white/80 text-xs mt-2">{{ msg }}</p>
</template>

<script setup>
const email = ref('')
const loading = ref(false)
const msg = ref('')

const submit = async () => {
  loading.value = true
  const data = await $fetch('/api/newsletter', { method: 'POST', body: { email: email.value } })
  msg.value = data.message
  email.value = ''
  loading.value = false
}
</script>
