<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Partner With Us</span>
      <h1 class="text-4xl md:text-5xl font-bold mt-2">Givings</h1>
    </div>
    <section class="py-16">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <p class="text-gray-500 text-lg leading-relaxed mb-10">There's no telling what impact you will make as you join us in partnership with God to take the gospel to the ends of the earth.</p>
        <div class="grid md:grid-cols-2 gap-6 mb-10">
          <div v-for="g in givingTypes" :key="g.title" class="bg-gray-50 p-8 rounded-2xl text-center">
            <div class="w-14 h-14 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4">
              <i :class="`fas ${g.icon} text-[#1a237e] text-xl`" />
            </div>
            <h3 class="font-bold text-lg mb-2">{{ g.title }}</h3>
            <p class="text-gray-500 text-sm">{{ g.desc }}</p>
          </div>
        </div>
        <div class="space-y-5">
          <!-- Sterling Bank -->
          <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div class="bg-[#00843D] text-white px-6 py-3 flex items-center gap-3">
              <i class="fas fa-university text-lg" />
              <span class="font-bold tracking-wide">Sterling Bank</span>
            </div>
            <div class="bg-white px-6 py-5 space-y-3">
              <div class="flex justify-between items-center border-b pb-3">
                <span class="text-gray-500 text-sm">Account Name</span>
                <span class="font-bold text-sm">AOCMI ZION CITY</span>
              </div>
              <div class="flex justify-between items-center border-b pb-3">
                <span class="text-gray-500 text-sm">Account Number</span>
                <span class="font-mono font-bold text-[#1a237e] text-lg tracking-widest">0511965172</span>
              </div>
              <div class="flex justify-between items-center border-b pb-3">
                <span class="text-gray-500 text-sm">Project Account</span>
                <span class="font-mono font-bold text-[#1a237e] text-lg tracking-widest">0512611335</span>
              </div>
              <p class="text-xs text-gray-400 pt-1">AOCMI ZION CITY (PROJECT)</p>
            </div>
          </div>

          <!-- GTBank -->
          <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div class="bg-[#F68B1F] text-white px-6 py-3 flex items-center gap-3">
              <i class="fas fa-university text-lg" />
              <span class="font-bold tracking-wide">Guaranty Trust Bank (GTB)</span>
            </div>
            <div class="bg-white px-6 py-5 space-y-3">
              <div class="flex justify-between items-center border-b pb-3">
                <span class="text-gray-500 text-sm">Account Name</span>
                <span class="font-bold text-sm">AOCMI ZION CITY</span>
              </div>
              <div v-for="acc in gtbAccounts" :key="acc.number" class="flex justify-between items-center border-b pb-3 last:border-0">
                <span class="text-gray-500 text-sm">{{ acc.currency }}</span>
                <span class="font-mono font-bold text-[#1a237e] text-lg tracking-widest">{{ acc.number }}</span>
              </div>
            </div>
          </div>

          <div class="bg-[#1a237e] text-white p-6 rounded-2xl text-center">
            <p class="text-white/70 text-sm mb-1">For enquiries, contact:</p>
            <p class="text-lg font-bold">{{ givings?.phone || '+234 902 729 3178' }}</p>
            <p class="text-white/70 text-sm">{{ givings?.email || 'hello@aocmizioncity.org' }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: givingsData } = await useFetch('/api/givings')
const givings = computed(() => givingsData.value)
const gtbAccounts = [
  { currency: 'NGN', number: '0615512179' },
  { currency: 'GBP', number: '0624634280' },
  { currency: 'EUR', number: '0624634273' },
  { currency: 'USD', number: '0624634266' },
]
const givingTypes = [
  { icon: 'fa-church', title: 'Tithes & Offerings', desc: 'Support the work of the ministry' },
  { icon: 'fa-hand-holding-heart', title: 'Special Seeds', desc: 'Sow into specific projects and missions' },
]
useHead({ title: 'Givings' })
</script>
