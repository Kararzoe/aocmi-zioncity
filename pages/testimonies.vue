<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Praise Reports</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Testimonies</h1>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="max-w-2xl mx-auto mb-16">
        <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 class="text-xl font-bold mb-1">Share Your Testimony</h2>
          <p class="text-gray-400 text-sm mb-6">Tell us what God has done for you</p>
          <p v-if="msg" class="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">{{ msg }}</p>
          <form @submit.prevent="submit" class="space-y-4">
            <input v-model="form.name" type="text" placeholder="Your Name" required class="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
            <input v-model="form.email" type="email" placeholder="Your Email" required class="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
            <textarea v-model="form.testimony" placeholder="Your Testimony..." required rows="5" class="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none resize-none" />
            <button :disabled="loading" class="btn-blue text-sm w-full disabled:opacity-50">
              {{ loading ? 'Submitting...' : 'Submit Testimony' }}
            </button>
          </form>
        </div>
      </div>
      <template v-if="testimonies.length">
        <div class="text-center mb-10">
          <span class="purple-text">What God Has Done</span>
          <h2 class="section-title mt-2">Approved Testimonies</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="t in testimonies" :key="t.id" class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-[#1a237e]/10 flex items-center justify-center">
                <i class="fas fa-user text-[#1a237e]" />
              </div>
              <div>
                <p class="font-bold text-sm">{{ t.name }}</p>
                <p class="text-gray-400 text-xs">{{ new Date(t.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">{{ t.testimony }}</p>
          </div>
        </div>
      </template>
      <p v-else class="text-center text-gray-400">No testimonies yet. Be the first to share!</p>
    </div>
  </div>
</template>

<script setup>
const form = reactive({ name: '', email: '', testimony: '' })
const loading = ref(false)
const msg = ref('')

const { data } = useFetch('/api/testimonies')
const testimonies = computed(() => data.value?.testimonies || [])

const submit = async () => {
  loading.value = true
  const res = await $fetch('/api/testimonies', { method: 'POST', body: { ...form } })
  msg.value = res.message
  Object.assign(form, { name: '', email: '', testimony: '' })
  loading.value = false
}
useHead({ title: 'Testimonies' })
</script>
