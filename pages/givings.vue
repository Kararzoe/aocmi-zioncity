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
        <div class="bg-[#1a237e] text-white p-8 rounded-2xl">
          <h3 class="text-xl font-bold mb-6">Bank Account Details</h3>
          <div v-if="givings" class="grid md:grid-cols-2 gap-4 mb-6">
            <img v-if="givings.image1" :src="givings.image1" alt="Account Details" class="rounded-xl w-full" />
            <img v-if="givings.image2" :src="givings.image2" alt="Account Details" class="rounded-xl w-full" />
          </div>
          <p class="text-white/70 text-sm">For enquiries, contact:</p>
          <p class="text-lg font-bold">{{ givings?.phone || '+234 902 729 3178' }}</p>
          <p class="text-white/70">{{ givings?.email || 'hello@aocmi.com' }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: givingsData } = await useFetch('/api/givings')
const givings = computed(() => givingsData.value)
const givingTypes = [
  { icon: 'fa-church', title: 'Tithes & Offerings', desc: 'Support the work of the ministry' },
  { icon: 'fa-hand-holding-heart', title: 'Special Seeds', desc: 'Sow into specific projects and missions' },
]
useHead({ title: 'Givings' })
</script>
