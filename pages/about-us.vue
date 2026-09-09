<template>
  <div>
    <div class="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img src="/img/church-1.jpg" alt="AOCMI" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#1a237e]/60 to-[#0a1128]/90" />
      </div>
      <div class="relative z-10 text-center px-4 pt-24 pb-12">
        <span class="text-white/60 uppercase tracking-[0.2em] text-xs">Who We Are</span>
        <h1 class="text-4xl md:text-5xl font-bold text-white mt-2">About Us</h1>
        <p class="text-white/60 text-sm mt-3 max-w-md mx-auto">Zion City — The Heavenly Jerusalem</p>
      </div>
    </div>
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span class="purple-text">Our Story</span>
          <h2 class="text-2xl md:text-3xl font-bold my-3">Ambassadors of Christ Ministries International</h2>
          <p class="text-gray-500 text-sm leading-relaxed mb-4">The Ambassadors of Christ Ministries (Zion City) is called with the main objective of propagating the gospel of reconciliation.</p>
          <p class="text-gray-500 text-sm leading-relaxed">Our community is built on the foundation of love, faith, and the uncompromising truth of scripture.</p>
        </div>
        <div class="relative">
          <img src="/img/pastor-gmp.jpg" alt="AOCMI" class="rounded-2xl w-full shadow-xl" />
          <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#1a237e]/20 rounded-2xl -z-10" />
          <div class="absolute -top-3 -left-3 w-16 h-16 bg-yellow-200 rounded-2xl -z-10" />
        </div>
      </div>
    </section>
    <section class="py-16 bg-gray-50">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-12">
          <span class="purple-text">What Drives Us</span>
          <h2 class="section-title mt-2">Our Mission & Vision</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mb-4">
              <i class="fas fa-bullseye text-[#1a237e] text-xl" />
            </div>
            <h3 class="font-bold text-lg mb-3">Our Mission</h3>
            <ul class="text-gray-500 text-sm space-y-2 leading-relaxed">
              <li class="flex gap-2"><i class="fas fa-check text-[#1a237e] text-xs mt-1 shrink-0" /> Raising believers who are ambassadors of reconciliation.</li>
              <li class="flex gap-2"><i class="fas fa-check text-[#1a237e] text-xs mt-1 shrink-0" /> Teaching Christians to embrace the fullness of Christ.</li>
              <li class="flex gap-2"><i class="fas fa-check text-[#1a237e] text-xs mt-1 shrink-0" /> Training a healthy congregation upon a solid word-based ministry.</li>
              <li class="flex gap-2"><i class="fas fa-check text-[#1a237e] text-xs mt-1 shrink-0" /> Raising a godly standard through academic excellence.</li>
            </ul>
          </div>
          <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mb-4">
              <i class="fas fa-eye text-[#1a237e] text-xl" />
            </div>
            <h3 class="font-bold text-lg mb-3">Our Vision</h3>
            <p class="text-gray-500 text-sm leading-relaxed">To fill the earth with the knowledge of the Glory of the Lord as the waters cover the sea.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <span class="purple-text">What We Stand For</span>
          <h2 class="section-title mt-2">Our Core Values</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div v-for="v in coreValues" :key="v.title" class="bg-gray-50 p-5 rounded-xl hover:bg-white hover:shadow-md transition text-center">
            <div class="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-3">
              <i :class="`fas ${v.icon} text-[#1a237e] text-lg`" />
            </div>
            <h3 class="font-bold text-sm mb-1">{{ v.title }}</h3>
            <p class="text-gray-400 text-xs">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-16 bg-gray-50">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="purple-text">Leadership</span>
          <h2 class="section-title mt-2">Our Senior Pastor</h2>
        </div>
        <div class="bg-white rounded-2xl shadow-md overflow-hidden md:flex">
          <div class="md:w-1/3">
            <img src="/img/dr-prince-buma.jpg" alt="Dr. Prince Buma" class="w-full h-64 md:h-full object-cover" />
          </div>
          <div class="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
            <span class="text-[#7c3aed] text-xs font-semibold uppercase tracking-wider">Founder & President</span>
            <h3 class="text-2xl md:text-3xl font-bold mt-1 mb-3">Pastor Prince Buma</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-4">Pastor Prince Buma is the founder and president of Ambassadors of Christ Ministries International (AOCMI).</p>
            <NuxtLink to="/president" class="btn-blue text-xs inline-block w-fit">Read More &nbsp;<i class="fas fa-arrow-right text-[10px]" /></NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const coreValues = [
  { icon: 'fa-book-bible', title: 'The Word', desc: "Committed to expository teaching of God's word" },
  { icon: 'fa-fire', title: 'The Spirit', desc: 'Led and empowered by the Holy Spirit' },
  { icon: 'fa-heart', title: 'Love', desc: 'Demonstrating the love of Christ' },
  { icon: 'fa-globe-africa', title: 'Mission', desc: 'Taking the gospel to the nations' },
]
useHead({ title: 'About Us' })
</script>
