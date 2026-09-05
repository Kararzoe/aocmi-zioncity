<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">We're Praying With You</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Prayer Request</h1>
      <p class="text-white/60 mt-4 max-w-xl mx-auto text-sm">"The prayer of a righteous person is powerful and effective." — James 5:16</p>
    </div>
    <div class="max-w-2xl mx-auto px-4 py-12">
      <p class="text-center text-gray-500 mb-8 leading-relaxed">Share your prayer request with us. Our prayer team will intercede on your behalf.</p>
      <form @submit.prevent="submit" class="space-y-4 bg-white p-8 rounded-2xl shadow-md">
        <input v-model="form.fullname" placeholder="Your Full Name" required class="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <div class="grid md:grid-cols-2 gap-4">
          <input v-model="form.email" type="email" placeholder="Email" required class="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          <input v-model="form.phone" placeholder="Phone (optional)" class="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        </div>
        <textarea v-model="form.request" placeholder="Share your prayer request..." required rows="6" class="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <p v-if="msg" class="text-green-600 text-sm text-center">{{ msg }}</p>
        <button :disabled="loading" class="w-full btn-blue disabled:opacity-50">
          {{ loading ? 'Submitting...' : 'Submit Prayer Request' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const form = reactive({ fullname: '', email: '', phone: '', request: '' })
const loading = ref(false)
const msg = ref('')
const { success, error: toastError } = useToast()

const submit = async () => {
  loading.value = true
  try {
    await $fetch('/api/prayer-request', { method: 'POST', body: { ...form } })
    msg.value = 'Your prayer request has been submitted. We are praying with you!'
    success(msg.value)
    Object.assign(form, { fullname: '', email: '', phone: '', request: '' })
  } catch { toastError('Something went wrong. Please try again.') }
  loading.value = false
}
useHead({ title: 'Prayer Request' })
</script>
