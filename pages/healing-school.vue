<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Divine Healing</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Healing School</h1>
    </div>
    <div class="max-w-2xl mx-auto px-4 py-12">
      <p class="text-center text-gray-500 mb-8 leading-relaxed">
        Jesus Christ is the same yesterday, today, and forever. Share your need with us and believe God for your miracle.
      </p>
      <form @submit.prevent="submit" class="space-y-4 bg-white p-8 rounded-2xl shadow-md">
        <input v-model="form.fullname" placeholder="Full Name" required class="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <div class="grid md:grid-cols-2 gap-4">
          <input v-model="form.email" type="email" placeholder="Email" required class="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          <input v-model="form.phone" placeholder="Phone" required class="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <input v-model="form.state" placeholder="State" required class="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          <input v-model="form.city" placeholder="City" required class="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        </div>
        <input v-model="form.problem" placeholder="Problem" required class="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <textarea v-model="form.narration" placeholder="Narration" required rows="4" class="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <p v-if="msg" class="text-green-600 text-sm text-center">{{ msg }}</p>
        <button :disabled="loading" class="w-full btn-blue disabled:opacity-50">
          {{ loading ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const form = reactive({ fullname: '', email: '', phone: '', state: '', city: '', problem: '', narration: '' })
const loading = ref(false)
const msg = ref('')
const { error: toastError, success } = useToast()

const submit = async () => {
  loading.value = true
  try {
    await $fetch('/api/healing-school', { method: 'POST', body: { ...form } })
    success('Your form has been submitted successfully!')
    msg.value = 'Your form has been submitted successfully!'
    Object.assign(form, { fullname: '', email: '', phone: '', state: '', city: '', problem: '', narration: '' })
  } catch { toastError('Something went wrong. Please try again.') }
  loading.value = false
}
useHead({ title: 'Healing School' })
</script>
