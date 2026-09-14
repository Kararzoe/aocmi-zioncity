<template>
  <div>
    <!-- Hero -->
    <div class="hero-banner pt-32 pb-24 text-white text-center relative overflow-hidden">
      <div class="dots-bg absolute inset-0" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1128]/60" />
      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
          <i class="fas fa-star text-yellow-400 text-xs" />
          <span class="text-white/80 uppercase tracking-[0.2em] text-xs">Praise Reports</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black mt-2 mb-3">Testimonies</h1>
        <p class="text-white/60 text-sm max-w-md mx-auto leading-relaxed">See what God is doing in the lives of His people at AOCMI Zion City</p>
        <div class="flex justify-center gap-6 mt-8">
          <div class="text-center">
            <p class="text-2xl font-black text-white">{{ testimonies.length }}+</p>
            <p class="text-white/50 text-[10px] uppercase tracking-wider">Testimonies</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-14">

      <!-- Submit form -->
      <div class="max-w-2xl mx-auto mb-16">
        <div class="form-card bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#1a237e]" />
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#1a237e]/5 rounded-full" />
          <div class="flex items-center gap-3 mb-6 relative z-10">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a237e] to-[#4a148c] flex items-center justify-center shadow-lg">
              <i class="fas fa-hands-praying text-white" />
            </div>
            <div>
              <h2 class="text-lg font-bold">Share Your Testimony</h2>
              <p class="text-gray-400 text-xs">Tell us what God has done for you</p>
            </div>
          </div>
          <div v-if="msg" class="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl text-sm mb-5 flex items-center gap-2">
            <i class="fas fa-check-circle text-green-500" /> {{ msg }}
          </div>
          <form @submit.prevent="submit" class="space-y-3 relative z-10">
            <input v-model="form.name" type="text" placeholder="Your Name" required class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none transition" />
            <input v-model="form.email" type="email" placeholder="Your Email" required class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none transition" />
            <textarea v-model="form.testimony" placeholder="Share what God has done for you..." required rows="5" class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none resize-none transition" />
            <button :disabled="loading" class="w-full bg-gradient-to-r from-[#1a237e] to-[#4a148c] text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 shadow-lg">
              {{ loading ? 'Submitting...' : '✦ Submit Testimony' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Testimonies grid -->
      <template v-if="testimonies.length">
        <div class="text-center mb-12">
          <span class="purple-text">Testimonies</span>
          <h2 class="section-title mt-2">From Our Ambassadors</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(t, i) in testimonies" :key="t.id"
            class="tcard group relative rounded-3xl overflow-hidden cursor-default"
            :style="{ animationDelay: `${i * 0.12}s` }">

            <!-- Card background with gradient -->
            <div class="absolute inset-0 bg-gradient-to-br"
              :style="cardGradient(i)" />
            <div class="absolute inset-0 bg-white/95 group-hover:bg-white/90 transition-all duration-500" />
            <!-- Logo watermark background -->
            <div class="absolute inset-0 flex items-center justify-center opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500">
              <img src="/img/logo.png" class="w-48 h-48 object-contain" />
            </div>

            <!-- Glowing orb -->
            <div class="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-500 blur-xl"
              :style="{ background: orbColor(i) }" />

            <!-- Border glow on hover -->
            <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#1a237e]/20 transition-all duration-500" />

            <div class="relative z-10 p-6">
              <!-- Top: quote + number -->
              <div class="flex items-start justify-between mb-5">
                <div class="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
                  :style="{ background: orbColor(i) }">
                  <i class="fas fa-quote-left text-white text-sm" />
                </div>
                <span class="text-5xl font-black text-gray-100 group-hover:text-gray-200 transition leading-none select-none">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
              </div>

              <!-- Testimony text -->
              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                {{ expanded[t.id] ? t.testimony : (t.testimony.length > 220 ? t.testimony.slice(0, 220) + '...' : t.testimony) }}
              </p>
              <button v-if="t.testimony.length > 220" @click="expanded[t.id] = !expanded[t.id]"
                class="text-[#1a237e] text-xs font-bold hover:underline mb-4 block">
                {{ expanded[t.id] ? '↑ Show less' : '↓ Read full testimony' }}
              </button>

              <!-- Divider -->
              <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

              <!-- Author + logo -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-md shrink-0"
                    :style="{ background: orbColor(i) }">
                    <i class="fas fa-user text-white text-xs" />
                  </div>
                  <div>
                    <p class="font-bold text-sm text-gray-800">{{ t.name }}</p>
  
                  </div>
                </div>
                <div class="flex items-center gap-1.5">
                  <img src="/img/logo.png" class="w-6 h-6 rounded-full shadow-sm" />
                  <span class="text-[9px] uppercase tracking-widest text-gray-500 font-semibold">AOCMI Zion City</span>
                </div>
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

const palettes = [
  { gradient: 'from-[#1a237e]/10 to-[#4a148c]/10', orb: 'linear-gradient(135deg,#1a237e,#4a148c)' },
  { gradient: 'from-[#1b5e20]/10 to-[#2e7d32]/10', orb: 'linear-gradient(135deg,#1b5e20,#388e3c)' },
  { gradient: 'from-[#b71c1c]/10 to-[#c62828]/10', orb: 'linear-gradient(135deg,#b71c1c,#e53935)' },
  { gradient: 'from-[#e65100]/10 to-[#f57c00]/10', orb: 'linear-gradient(135deg,#e65100,#fb8c00)' },
  { gradient: 'from-[#006064]/10 to-[#00838f]/10', orb: 'linear-gradient(135deg,#006064,#00acc1)' },
  { gradient: 'from-[#4a148c]/10 to-[#7b1fa2]/10', orb: 'linear-gradient(135deg,#4a148c,#8e24aa)' },
]
const cardGradient = (i) => palettes[i % palettes.length].gradient
const orbColor = (i) => palettes[i % palettes.length].orb

useHead({ title: 'Testimonies — AOCMI Zion City' })
</script>

<style scoped>
.hero-banner {
  background: linear-gradient(135deg, #0a1128 0%, #1a237e 60%, #4a148c 100%);
}
.dots-bg {
  background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
    radial-gradient(circle at 80% 20%, white 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.08;
}
.tcard {
  opacity: 0;
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  box-shadow: 0 4px 24px rgba(26,35,126,0.08);
  transition: box-shadow 0.3s, transform 0.3s;
}
.tcard:hover {
  box-shadow: 0 12px 40px rgba(26,35,126,0.15);
  transform: translateY(-4px);
}
.form-card {
  opacity: 0;
  animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.1s;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
