<template>
  <div>
    <!-- Hero -->
    <div class="pt-32 pb-20 text-white text-center relative overflow-hidden" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 60px 60px" />
      <div class="relative z-10">
        <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Praise Reports</span>
        <h1 class="text-4xl md:text-5xl font-bold mt-2">Testimonies</h1>
        <p class="text-white/60 text-sm mt-3 max-w-md mx-auto">See what God is doing in the lives of His people</p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-14">

      <!-- Submit form -->
      <div class="max-w-2xl mx-auto mb-16">
        <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-full bg-[#1a237e]/10 flex items-center justify-center">
              <i class="fas fa-hands-praying text-[#1a237e]" />
            </div>
            <div>
              <h2 class="text-lg font-bold">Share Your Testimony</h2>
              <p class="text-gray-400 text-xs">Tell us what God has done for you</p>
            </div>
          </div>
          <p v-if="msg" class="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4 flex items-center gap-2"><i class="fas fa-check-circle" /> {{ msg }}</p>
          <form @submit.prevent="submit" class="space-y-3">
            <input v-model="form.name" type="text" placeholder="Your Name" required class="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
            <input v-model="form.email" type="email" placeholder="Your Email" required class="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
            <textarea v-model="form.testimony" placeholder="Share what God has done for you..." required rows="5" class="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none resize-none" />
            <button :disabled="loading" class="btn-blue text-sm w-full disabled:opacity-50">
              {{ loading ? 'Submitting...' : 'Submit Testimony' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Testimonies grid -->
      <template v-if="testimonies.length">
        <div class="text-center mb-10">
          <span class="purple-text">What God Has Done</span>
          <h2 class="section-title mt-2">Approved Testimonies</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(t, i) in testimonies" :key="t.id"
            class="tcard group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            :style="{ animationDelay: `${i * 0.1}s` }">
            <!-- Top accent bar -->
            <div class="h-1 w-full bg-gradient-to-r from-[#1a237e] to-[#4a148c]" />
            <div class="p-6">
              <!-- Quote icon -->
              <i class="fas fa-quote-left text-[#1a237e]/10 text-4xl absolute top-6 right-5 group-hover:text-[#1a237e]/20 transition" />
              <!-- Author -->
              <div class="flex items-center gap-3 mb-4">
                <div class="w-11 h-11 rounded-full bg-gradient-to-br from-[#1a237e] to-[#4a148c] flex items-center justify-center shrink-0 shadow-md">
                  <i class="fas fa-user text-white text-sm" />
                </div>
                <div>
                  <p class="font-bold text-sm text-gray-800">{{ t.name }}</p>
                  <p class="text-gray-400 text-[10px]">{{ new Date(t.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                </div>
              </div>
              <!-- Testimony text -->
              <p class="text-gray-600 text-sm leading-relaxed">{{ expanded[t.id] ? t.testimony : (t.testimony.length > 220 ? t.testimony.slice(0, 220) + '...' : t.testimony) }}</p>
              <button v-if="t.testimony.length > 220" @click="expanded[t.id] = !expanded[t.id]"
                class="text-[#1a237e] text-xs font-semibold mt-2 hover:underline">
                {{ expanded[t.id] ? 'Show less' : 'Read more' }}
              </button>
              <!-- Logo watermark -->
              <div class="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-100">
                <img src="/img/logo.png" class="w-4 h-4 rounded opacity-50" />
                <span class="text-gray-300 text-[9px] uppercase tracking-widest">AOCMI Zion City</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <p v-else class="text-center text-gray-400 py-10">No testimonies yet. Be the first to share!</p>
    </div>
  </div>
</template>

<script setup>
const form = reactive({ name: '', email: '', testimony: '' })
const loading = ref(false)
const msg = ref('')
const expanded = reactive({})

const { data } = useFetch('/api/testimonies')
const testimonies = computed(() => data.value?.testimonies || [])

const submit = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/testimonies', { method: 'POST', body: { ...form } })
    msg.value = res.message
    Object.assign(form, { name: '', email: '', testimony: '' })
  } catch {}
  loading.value = false
}
useHead({ title: 'Testimonies — AOCMI Zion City' })
</script>

<style scoped>
.tcard {
  opacity: 0;
  animation: fadeUp 0.6s ease forwards;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(25px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
