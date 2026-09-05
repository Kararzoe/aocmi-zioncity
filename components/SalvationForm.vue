<template>
  <form @submit.prevent="submit" class="grid grid-cols-2 gap-3 max-w-lg mx-auto">
    <input v-model="form.fullname" placeholder="Full Name" required class="col-span-2 bg-white/10 border border-white/20 text-white placeholder-white/50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/40" />
    <input v-model="form.email" type="email" placeholder="Email" required class="bg-white/10 border border-white/20 text-white placeholder-white/50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/40" />
    <input v-model="form.phone" placeholder="Phone" required class="bg-white/10 border border-white/20 text-white placeholder-white/50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/40" />
    <input v-model="form.location" placeholder="Location" required class="col-span-2 bg-white/10 border border-white/20 text-white placeholder-white/50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/40" />
    <p v-if="msg" class="col-span-2 text-green-300 text-sm">{{ msg }}</p>
    <button :disabled="loading" class="col-span-2 bg-white text-[#1a237e] py-3 rounded-full font-bold hover:bg-gray-100 transition disabled:opacity-50">
      {{ loading ? 'Submitting...' : 'Submit' }}
    </button>
  </form>
</template>

<script setup>
const form = reactive({ fullname: '', email: '', phone: '', location: '' })
const loading = ref(false)
const msg = ref('')

const submit = async () => {
  loading.value = true
  await $fetch('/api/contact', { method: 'POST', body: { ...form } })
  msg.value = 'Thank you! We will be in touch.'
  Object.assign(form, { fullname: '', email: '', phone: '', location: '' })
  loading.value = false
}
</script>
