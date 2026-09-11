<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Partner With Us</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Givings</h1>
    </div>

    <section class="py-16">
      <div class="max-w-3xl mx-auto px-4">

        <div class="flex justify-center mb-8">
          <div class="flex items-center gap-3 bg-gray-50 px-8 py-4 rounded-2xl">
            <div class="w-10 h-10 rounded-full bg-[#1a237e]/10 flex items-center justify-center">
              <i class="fas fa-church text-[#1a237e]" />
            </div>
            <h3 class="font-bold text-lg">Tithes &amp; Offerings</h3>
          </div>
        </div>

        <h2 class="text-center font-bold text-gray-700 mb-6 uppercase tracking-widest text-sm">Bank Account Details</h2>

        <div class="space-y-6">

          <!-- Sterling Bank -->
          <div class="bank-card" style="animation-delay: 0s">
            <div class="bank-header" style="background: linear-gradient(135deg, #00843D, #00a84f)">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <i class="fas fa-university text-white" />
                </div>
                <div>
                  <p class="font-bold text-lg">Sterling Bank</p>
                  <p class="text-white/70 text-xs">Commercial Bank</p>
                </div>
              </div>
              <div class="text-white/20 text-5xl font-black">SB</div>
            </div>
            <div class="bank-body">
              <div class="account-name-row">
                <span class="label">Account Name</span>
                <span class="value">AOCMI ZION CITY</span>
              </div>
              <div class="account-row">
                <div>
                  <p class="label">Account Number</p>
                  <p class="number">0511965172</p>
                </div>
                <button @click="copy('0511965172', 'sterling-main')" class="copy-btn">
                  <i :class="copied === 'sterling-main' ? 'fas fa-check text-green-500' : 'fas fa-copy'" />
                  <span>{{ copied === 'sterling-main' ? 'Copied!' : 'Copy' }}</span>
                </button>
              </div>
              <div class="account-row border-t border-gray-100 pt-3">
                <div>
                  <p class="label">Project Account <span class="text-[10px] text-gray-400 ml-1">AOCMI ZION CITY (PROJECT)</span></p>
                  <p class="number">0512611335</p>
                </div>
                <button @click="copy('0512611335', 'sterling-project')" class="copy-btn">
                  <i :class="copied === 'sterling-project' ? 'fas fa-check text-green-500' : 'fas fa-copy'" />
                  <span>{{ copied === 'sterling-project' ? 'Copied!' : 'Copy' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- GTBank -->
          <div class="bank-card" style="animation-delay: 0.15s">
            <div class="bank-header" style="background: linear-gradient(135deg, #e07b00, #F68B1F)">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <i class="fas fa-university text-white" />
                </div>
                <div>
                  <p class="font-bold text-lg">Guaranty Trust Bank</p>
                  <p class="text-white/70 text-xs">GTB · Multi-Currency</p>
                </div>
              </div>
              <div class="text-white/20 text-5xl font-black">GT</div>
            </div>
            <div class="bank-body">
              <div class="account-name-row">
                <span class="label">Account Name</span>
                <span class="value">AOCMI ZION CITY</span>
              </div>
              <div v-for="(acc, i) in gtbAccounts" :key="acc.number"
                class="account-row" :class="i > 0 ? 'border-t border-gray-100 pt-3' : ''">
                <div>
                  <p class="label flex items-center gap-2">
                    <span class="currency-badge">{{ acc.currency }}</span>
                    {{ acc.label }}
                  </p>
                  <p class="number">{{ acc.number }}</p>
                </div>
                <button @click="copy(acc.number, acc.currency)" class="copy-btn">
                  <i :class="copied === acc.currency ? 'fas fa-check text-green-500' : 'fas fa-copy'" />
                  <span>{{ copied === acc.currency ? 'Copied!' : 'Copy' }}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-8 bg-[#1a237e] text-white p-6 rounded-2xl text-center">
          <p class="text-white/70 text-sm mb-1">For enquiries, contact:</p>
          <p class="text-lg font-bold">{{ givings?.phone || '+234 902 729 3178' }}</p>
          <p class="text-white/70 text-sm">{{ givings?.email || 'hello@aocmizioncity.org' }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: givingsData } = useFetch('/api/givings')
const givings = computed(() => givingsData.value)
const copied = ref(null)

const copy = (text, key) => {
  navigator.clipboard.writeText(text)
  copied.value = key
  setTimeout(() => { copied.value = null }, 2000)
}

const gtbAccounts = [
  { currency: 'NGN', label: 'Nigerian Naira', number: '0615512179' },
  { currency: 'GBP', label: 'British Pounds', number: '0624634280' },
  { currency: 'EUR', label: 'Euro', number: '0624634273' },
  { currency: 'USD', label: 'US Dollar', number: '0624634266' },
]
useHead({ title: 'Givings' })
</script>

<style scoped>
.bank-card {
  @apply rounded-2xl overflow-hidden shadow-lg border border-gray-100;
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
}
.bank-header {
  @apply px-6 py-5 text-white flex items-center justify-between;
}
.bank-body {
  @apply bg-white px-6 py-5 space-y-3;
}
.account-name-row {
  @apply flex justify-between items-center border-b border-gray-100 pb-3 mb-1;
}
.account-row {
  @apply flex justify-between items-center gap-3;
}
.label {
  @apply text-gray-400 text-xs mb-1 block;
}
.value {
  @apply font-bold text-sm text-gray-800;
}
.number {
  @apply font-mono font-bold text-[#1a237e] text-xl tracking-widest;
}
.copy-btn {
  @apply flex items-center gap-1.5 bg-gray-50 hover:bg-[#1a237e] hover:text-white text-gray-500 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 shrink-0;
}
.currency-badge {
  @apply bg-[#1a237e]/10 text-[#1a237e] text-[10px] font-bold px-2 py-0.5 rounded-full;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
