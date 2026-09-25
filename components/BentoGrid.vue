<template>
  <section class="py-16 px-4 max-w-7xl mx-auto">
    <ScrollReveal anim="fadeUp">
      <div class="text-center mb-10">
        <span class="purple-text">Explore</span>
        <h2 class="section-title mt-2">Everything at Zion City</h2>
      </div>
    </ScrollReveal>

    <div class="bento-grid">

      <!-- CELL 1: Big — Latest Message -->
      <ScrollReveal anim="zoomIn" delay="0s" class="bento-cell bento-big">
        <div class="w-full h-full relative noise" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 60%, #4a148c 100%)">
          <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px" />
          <div class="absolute top-4 left-4">
            <span class="glass text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Latest Message</span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <div class="liquid-gold text-xs font-bold uppercase tracking-widest mb-2">Listen Now</div>
            <h3 class="text-white font-black text-xl md:text-2xl leading-tight mb-3">Raising a people of divine excellence</h3>
            <a href="https://t.me/zioncitymessages" target="_blank" class="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full transition-all border border-white/20">
              <i class="fab fa-telegram" /> Download on Telegram
            </a>
          </div>
          <div class="absolute top-1/2 right-6 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center glow-purple" style="background: linear-gradient(135deg,#7c3aed,#4f46e5)">
            <i class="fas fa-play text-white text-xl ml-1" />
          </div>
        </div>
      </ScrollReveal>

      <!-- CELL 2: Tall — Pastor -->
      <ScrollReveal anim="fadeLeft" delay="0.1s" class="bento-cell bento-tall">
        <div class="w-full h-full relative overflow-hidden">
          <img src="/img/dr-prince-buma.jpg" class="w-full h-full object-cover" alt="Pastor" />
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(10,17,40,0.95) 0%, transparent 50%)" />
          <div class="absolute bottom-0 left-0 right-0 p-5">
            <p class="liquid-gold text-[10px] font-bold uppercase tracking-widest mb-1">Founder & President</p>
            <h3 class="text-white font-black text-lg leading-tight">Pastor Prince Buma</h3>
            <NuxtLink to="/president" class="mt-3 inline-flex items-center gap-1 text-white/70 hover:text-white text-xs transition">
              Read More <i class="fas fa-arrow-right text-[9px]" />
            </NuxtLink>
          </div>
        </div>
      </ScrollReveal>

      <!-- CELL 3: Normal — Events -->
      <ScrollReveal anim="fadeUp" delay="0.2s" class="bento-cell">
        <NuxtLink to="/events" class="block w-full h-full relative overflow-hidden">
          <img src="/img/church-1.jpg" class="w-full h-full object-cover" alt="Events" />
          <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(26,35,126,0.85), rgba(74,20,140,0.7))" />
          <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <i class="fas fa-calendar-star text-white/80 text-3xl mb-2" />
            <h3 class="text-white font-black text-lg">Events</h3>
            <p class="text-white/70 text-xs">Upcoming Programs</p>
          </div>
        </NuxtLink>
      </ScrollReveal>

      <!-- CELL 5: Wide — Scripture -->
      <ScrollReveal anim="fadeUp" delay="0.25s" class="bento-cell bento-wide">
        <div class="w-full h-full glass-dark flex items-center justify-center p-6 relative noise" style="background: linear-gradient(135deg, rgba(10,17,40,0.9), rgba(74,20,140,0.6))">
          <div class="absolute top-3 left-4 text-white/20 text-6xl font-black leading-none select-none">"</div>
          <div class="text-center relative z-10">
            <p class="text-white/90 text-sm md:text-base italic leading-relaxed font-light max-w-md">
              "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
            </p>
            <p class="liquid-gold text-xs font-bold mt-3 uppercase tracking-widest">John 3:16</p>
          </div>
          <div class="absolute bottom-3 right-4 text-white/20 text-6xl font-black leading-none select-none rotate-180">"</div>
        </div>
      </ScrollReveal>

      <!-- CELL 6: Normal — Music -->
      <ScrollReveal anim="zoomIn" delay="0.3s" class="bento-cell">
        <NuxtLink to="/our-music" class="block w-full h-full relative noise" style="background: linear-gradient(135deg, #0ea5e9, #0284c7, #075985)">
          <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-3 animate-float-3d">
              <i class="fas fa-music text-white text-2xl" />
            </div>
            <h3 class="text-white font-black text-lg">Worship Music</h3>
            <p class="text-white/70 text-xs mt-1">Listen & Worship</p>
          </div>
          <!-- Sound bars -->
          <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
            <div v-for="n in 5" :key="n" class="w-1 bg-white/40 rounded-full" :style="`height: ${8 + n * 4}px; animation: soundBar 1s ease-in-out ${n * 0.15}s infinite alternate`" />
          </div>
        </NuxtLink>
      </ScrollReveal>

      <!-- CELL 7: Normal — Healing School -->
      <ScrollReveal anim="fadeRight" delay="0.35s" class="bento-cell">
        <NuxtLink to="/healing-school" class="block w-full h-full relative overflow-hidden">
          <img src="/img/healing-sch-new.png" class="w-full h-full object-cover" alt="Healing School" />
          <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(16,185,129,0.85), rgba(5,150,105,0.7))" />
          <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <i class="fas fa-hand-sparkles text-white text-3xl mb-2" />
            <h3 class="text-white font-black text-base">Healing School</h3>
            <p class="text-white/80 text-xs">Register Now</p>
          </div>
        </NuxtLink>
      </ScrollReveal>

      <!-- CELL 8: Normal — Devotionals -->
      <ScrollReveal anim="fadeUp" delay="0.4s" class="bento-cell">
        <NuxtLink to="/devotionals" class="block w-full h-full relative noise" style="background: linear-gradient(135deg, #7c3aed, #4f46e5, #4338ca)">
          <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <img src="/img/apokalopsis.png" class="w-12 h-12 object-contain mb-2 animate-float-3d" alt="Apokalupsis" />
            <h3 class="text-white font-black text-base">Apokalupsis</h3>
            <p class="text-white/70 text-xs mt-1">Daily Devotionals</p>
          </div>
        </NuxtLink>
      </ScrollReveal>

    </div>
  </section>
</template>

<style scoped>
@keyframes soundBar {
  from { transform: scaleY(0.4); opacity: 0.5; }
  to   { transform: scaleY(1.4); opacity: 1; }
}
</style>
