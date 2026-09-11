<template>
  <div>
    <div class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img src="/img/dr-prince-buma.jpg" alt="Dr. Prince Buma" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#1a237e]/60 to-[#0a1128]/90" />
      </div>
      <div class="relative z-10 text-center px-4 pt-24 pb-16">
        <p class="animate-fade-in-up text-white/60 uppercase tracking-[0.3em] text-xs md:text-sm mb-4">Our Dear Man of God</p>
        <h1 class="animate-fade-in-scale animate-delay-1 text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">Pastor Prince Buma</h1>
        <div class="animate-fade-in-up animate-delay-2 flex justify-center mb-6">
          <div class="h-[2px] w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <p class="animate-fade-in-up animate-delay-3 text-white/80 text-lg md:text-xl font-light">Founder & President, AOCMI-ZION CITY</p>
        <div class="animate-fade-in-up animate-delay-4 flex justify-center gap-3 mt-6">
          <a href="https://instagram.com/drprincebuma" target="_blank" class="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition text-white">
            <i class="fab fa-instagram text-lg" />
          </a>
          <a href="https://youtube.com/@drprincebuma" target="_blank" class="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition text-white">
            <i class="fab fa-youtube text-lg" />
          </a>
        </div>
      </div>
    </div>
    <section class="py-16">
      <div class="max-w-5xl mx-auto px-4 space-y-6 text-gray-600 leading-relaxed">
        <span class="purple-text">About</span>
        <p>Pastor Prince Buma is the founder and president of Ambassadors of Christ Ministries International (AOCMI), also known as Zion City — The Heavenly Jerusalem.</p>
        <p>Under his leadership, AOCMI-ZION CITY has grown into a vibrant community of believers who are grounded in the Word, empowered by the Holy Spirit, and committed to fulfilling the Great Commission.</p>
        <p>Pastor Prince Buma's teaching ministry is characterized by clarity, depth, and a strong emphasis on the practical application of scripture.</p>
        <p>His vision is to see a generation of believers who are not only hearers of the Word but doers — men and women who carry the presence of God and impact their world for the kingdom.</p>
      </div>
    </section>
    <section class="py-16 text-white text-center relative overflow-hidden" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 50%, #4a148c 100%)">
      <div class="relative z-10 max-w-2xl mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Connect with Pastor Prince Buma</h2>
        <p class="text-white/70 mb-8">Follow for teachings, updates, and inspiration</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/store" class="bg-white text-[#1a237e] px-8 py-3.5 rounded-full inline-flex items-center gap-2 font-bold hover:bg-gray-100 transition shadow-md">
            <i class="fas fa-book text-xl" /> Books
          </NuxtLink>
          <a href="https://instagram.com/drprincebuma" target="_blank" class="bg-white text-[#1a237e] px-8 py-3.5 rounded-full inline-flex items-center gap-2 font-bold hover:bg-gray-100 transition shadow-md">
            <i class="fab fa-instagram text-xl" /> Instagram
          </a>
          <a href="https://youtube.com/@drprincebuma" target="_blank" class="bg-red-600 text-white px-8 py-3.5 rounded-full inline-flex items-center gap-2 font-bold hover:bg-red-700 transition shadow-md">
            <i class="fab fa-youtube text-xl" /> YouTube
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({ title: 'Pastor Prince Buma — Founder & President' })
</script>
