<template>
  <div>
    <!-- Hero -->
    <div class="hero-section">
      <div class="hero-orb hero-orb-1" style="z-index:1" />
      <div class="hero-orb hero-orb-2" style="z-index:1" />
      <div class="hero-orb hero-orb-3" style="z-index:1" />
      <div class="hero-particles" style="z-index:1">
        <div v-for="i in 12" :key="i" class="hero-particle"
          :style="{ left: `${8 + (i * 7.5) % 85}%`, top: `${12 + (i * 13) % 70}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${3 + (i % 3)}s` }" />
      </div>
      <div class="hero-glow" style="z-index:1" />
      <div class="hero-fade-bottom" />
      <div class="max-w-5xl mx-auto text-center px-4 relative" style="z-index:3">
        <p class="animate-fade-in-up text-white/60 uppercase tracking-[0.35em] text-xs md:text-sm mb-4 font-medium">Welcome to</p>
        <div class="flex justify-center mb-6">
          <div class="animate-line-expand h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <h1 class="animate-fade-in-scale animate-delay-1 text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1]">Ambassadors of Christ</h1>
        <h1 class="animate-fade-in-scale animate-delay-2 text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span class="hero-gradient-text">Ministries International</span>
        </h1>
        <p class="animate-fade-in-up animate-delay-3 text-base md:text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed font-light">
          Conveying the message of reconciliation with the demonstration of Spirit and Power
        </p>
        <div class="animate-fade-in-up animate-delay-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://youtube.com/@aocmizioncity" target="_blank"
            class="bg-red-600 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-red-700 transition-all duration-300 shadow-lg inline-flex items-center gap-2">
            <i class="fab fa-youtube" /> Watch Live
          </a>
        </div>
      </div>
    </div>

    <!-- Service Times + Countdown -->
    <section class="relative z-10 -mt-14">
      <div class="max-w-4xl mx-auto px-4">
        <div class="glass-light p-5 md:p-7 noise">
          <div class="grid grid-cols-2 gap-4 mb-5">
            <div v-for="s in serviceTimes" :key="s.title" class="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/60 transition">
              <div :class="`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0 ${s.color} shadow-md`">
                <i :class="`fas ${s.icon} text-lg`" />
              </div>
              <div>
                <p class="font-bold text-xs md:text-sm">{{ s.title }}</p>
                <p class="text-gray-400 text-[11px] md:text-xs">{{ s.time }}</p>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-4">
            <p class="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">Next Sunday Service In</p>
            <div class="grid grid-cols-4 gap-2 text-center">
              <div v-for="u in countdown" :key="u.label" class="countdown-box" style="background: linear-gradient(135deg, #0a1128, #1a237e)">
                <p class="text-2xl md:text-3xl font-black text-white glow-text">{{ u.value }}</p>
                <p class="text-[10px] text-white/50 uppercase tracking-wider mt-1">{{ u.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid -->
    <BentoGrid />

    <!-- Join Online -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center">
          <span class="purple-text">Online</span>
          <h2 class="text-2xl md:text-3xl font-bold my-3">Join Our Service Online</h2>
          <p class="text-gray-500 text-sm mb-6 leading-relaxed max-w-xl mx-auto">
            Join us for powerful worship experience and practical teachings of God's word like never before.
          </p>
          <div class="flex flex-wrap gap-3 justify-center">
            <a href="https://youtube.com/@aocmizioncity" target="_blank"
              class="bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold text-xs inline-flex items-center gap-2 hover:bg-red-700 transition shadow-md">
              <i class="fab fa-youtube" /> YouTube
            </a>
            <NuxtLink to="/events" class="btn-blue text-xs">Upcoming Events</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="py-16">
      <ScrollReveal anim="fadeUp">
      <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div class="relative order-2 md:order-1">
          <img src="/img/pastor-gmp.jpg" alt="Pastor" loading="lazy" class="rounded-2xl w-full shadow-xl" />
          <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-yellow-200 rounded-2xl -z-10" />
          <div class="absolute -top-3 -left-3 w-16 h-16 bg-[#1a237e]/20 rounded-2xl -z-10" />
        </div>
        <div class="order-1 md:order-2">
          <span class="purple-text">Zion City — The Heavenly Jerusalem</span>
          <h2 class="text-2xl md:text-3xl font-bold my-3">Ambassadors of Christ Ministries International</h2>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed">
            The Ambassadors of Christ Ministries (Zion City) is called with the main objective of propagating the gospel of reconciliation.
          </p>
          <NuxtLink to="/about-us" class="btn-blue text-xs">Learn More &nbsp;<i class="fas fa-arrow-right text-[10px]" /></NuxtLink>
        </div>
      </div>
      </ScrollReveal>
    </section>

    <!-- Messages -->
    <section class="py-16 bg-blue-gradient text-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="text-white/60 uppercase tracking-wider text-xs">Listen & Learn</span>
          <h2 class="text-2xl md:text-3xl font-bold mt-2">Raising a people characterize by divine excellence through the practical teaching of the wisdom of God...</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          <ScrollReveal v-for="(m, i) in messages" :key="m.id" anim="fadeUp" :delay="`${i * 0.08}s`">
          <a :href="m.link" target="_blank" class="messages-link group block h-full">
            <div class="h-full rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style="background: rgba(255,255,255,0.07); backdrop-filter: blur(12px)">
              <div class="overflow-hidden">
                <img :src="m.image" :alt="m.title" loading="lazy"
                  class="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-xs md:text-sm mb-1 text-white">{{ m.title.length > 35 ? m.title.slice(0, 35) + '...' : m.title }}</h3>
                <p class="text-[10px] md:text-xs text-white/40 mb-2">{{ new Date(m.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
                <span class="text-blue-300 text-[10px] md:text-xs font-semibold group-hover:underline inline-flex items-center gap-1"><i class="fas fa-headphones text-[9px]" /> Listen Now</span>
              </div>
            </div>
          </a>
          </ScrollReveal>
          <p v-if="!messages.length" class="col-span-3 text-center text-white/60">No messages uploaded yet</p>
        </div>
        <div class="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink to="/our-messages" class="btn-outline text-sm">View More</NuxtLink>
          <a href="https://t.me/zioncitymessages" target="_blank" class="btn-outline text-sm inline-flex items-center gap-2">
            <i class="fab fa-telegram" /> Download on Telegram
          </a>
        </div>
      </div>
    </section>

    <!-- Word of the Year -->
    <section v-if="wordOfTheYear" class="py-20 relative overflow-hidden" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 60%, #4a148c 100%)">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 60px 60px" />
      <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div class="woty-img" >
          <img :src="wordOfTheYear.img" alt="Word of the Year" loading="lazy" class="rounded-2xl w-full shadow-2xl" />
        </div>
        <div class="text-white text-center md:text-left woty-text">
          <p class="uppercase tracking-[0.4em] text-white/50 text-xs mb-3">Prophetic Declaration</p>
          <div class="h-[2px] w-16 bg-gradient-to-r from-white/50 to-transparent mb-6 mx-auto md:mx-0" />
          <h2 class="text-5xl md:text-7xl font-black text-white leading-none mb-2" style="letter-spacing: -0.02em">2026</h2>
        </div>
      </div>
    </section>

    <!-- News -->
    <section v-if="news.length" class="py-16">
      <ScrollReveal anim="fadeUp">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-8">
          <span class="purple-text">Latest Updates</span>
          <h2 class="section-title mt-2">News & Updates</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScrollReveal v-for="(n, i) in news" :key="n.id" anim="fadeUp" :delay="`${i * 0.1}s`">
          <div class="card-3d bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
            <img v-if="n.image" :src="n.image" :alt="n.title" class="w-full h-44 object-cover" loading="lazy" />
            <div class="p-5 card-3d-inner">
              <p class="text-[10px] text-gray-400 mb-1">{{ new Date(n.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
              <h3 class="font-bold text-sm mb-2">{{ n.title }}</h3>
              <p class="text-gray-500 text-xs leading-relaxed mb-3">{{ n.body.length > 100 ? n.body.slice(0, 100) + '...' : n.body }}</p>
              <a v-if="n.link" :href="n.link" target="_blank" class="text-[#1a237e] text-xs font-semibold hover:underline inline-flex items-center gap-1"><i class="fas fa-arrow-right text-[9px]" /> Read More</a>
            </div>
          </div>
          </ScrollReveal>
        </div>
        <div class="text-center mt-7">
          <NuxtLink to="/news" class="btn-blue text-xs">View All News &nbsp;<i class="fas fa-arrow-right text-[10px]" /></NuxtLink>
        </div>
      </div>
      </ScrollReveal>
    </section>

    <!-- Testimonies -->
    <section v-if="testimonies.length" class="py-20 relative overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 55%, #4a148c 100%)" />
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 40px 40px" />
      <!-- Floating orbs -->
      <div class="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl opacity-20" style="background: radial-gradient(circle, #7c3aed, transparent)" />
      <div class="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-20" style="background: radial-gradient(circle, #1d4ed8, transparent)" />

      <div class="max-w-6xl mx-auto px-4 relative z-10">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <i class="fas fa-star text-yellow-400 text-xs" />
            <span class="text-white/70 uppercase tracking-[0.25em] text-[10px]">Testimonies</span>
          </div>
          <p class="text-white/50 text-sm mt-2">From Our Ambassadors</p>
        </div>

        <!-- Cards -->
        <div class="grid md:grid-cols-3 gap-5">
          <div v-for="(t, i) in testimonies" :key="t.id"
            class="htcard group relative rounded-3xl overflow-hidden"
            :style="{ animationDelay: `${i * 0.15}s` }">
            <!-- Card inner -->
            <div class="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl group-hover:bg-white/15 transition-all duration-500" />
            <!-- Glow orb per card -->
            <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
              :style="{ background: ['#7c3aed','#0ea5e9','#10b981'][i % 3] }" />
            <div class="relative z-10 p-6">
              <!-- Quote -->
              <div class="flex justify-between items-start mb-4">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center"
                  :style="{ background: ['linear-gradient(135deg,#7c3aed,#4f46e5)','linear-gradient(135deg,#0ea5e9,#0284c7)','linear-gradient(135deg,#10b981,#059669)'][i % 3] }">
                  <i class="fas fa-quote-left text-white text-xs" />
                </div>
                <span class="text-4xl font-black text-white/10 leading-none select-none">{{ String(i+1).padStart(2,'0') }}</span>
              </div>
              <!-- Text -->
              <p class="text-white/80 text-sm leading-relaxed mb-5">{{ t.testimony.length > 180 ? t.testimony.slice(0, 180) + '...' : t.testimony }}</p>
              <!-- Divider -->
              <div class="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
              <!-- Author + logo -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center"
                    :style="{ background: ['linear-gradient(135deg,#7c3aed,#4f46e5)','linear-gradient(135deg,#0ea5e9,#0284c7)','linear-gradient(135deg,#10b981,#059669)'][i % 3] }">
                    <i class="fas fa-user text-white text-[10px]" />
                  </div>
                  <p class="font-bold text-white text-sm">{{ t.name }}</p>
                </div>
                <div class="flex items-center gap-1 opacity-40">
                  <img src="/img/logo.png" class="w-4 h-4 rounded-full" />
                  <span class="text-[8px] text-white uppercase tracking-widest hidden sm:block">AOCMI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink to="/testimonies" class="bg-white text-[#1a237e] px-6 py-2.5 rounded-full font-semibold text-xs hover:bg-gray-100 transition shadow-lg inline-block">Read More Testimonies</NuxtLink>
          <NuxtLink to="/testimonies" class="border border-white/30 text-white px-6 py-2.5 rounded-full font-semibold text-xs hover:bg-white/10 transition inline-block">Share Your Testimony</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="py-16 bg-gray-50">
      <ScrollReveal anim="fadeUp">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-8">
          <span class="purple-text">Pictorial Moments</span>
          <h2 class="section-title mt-2">Live at AOCMI-ZIONCITY</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="(src, i) in galleryImages" :key="src"
            class="overflow-hidden rounded-2xl shadow-sm group relative"
            :style="{ animationDelay: `${i * 0.05}s` }">
            <img :src="src" alt="AOCMI" loading="lazy" class="w-full h-36 md:h-44 object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1a237e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </div>
        </div>
        <div class="text-center mt-7">
          <NuxtLink to="/gallery" class="btn-blue text-xs">View Full Gallery &nbsp;<i class="fas fa-arrow-right text-[10px]" /></NuxtLink>
        </div>
      </div>
      </ScrollReveal>
    </section>

    <!-- Partner + Follow -->
    <section class="py-16">
      <ScrollReveal anim="fadeUp">
      <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
        <div class="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
          style="background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%)">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div class="relative z-10">
            <span class="text-white/60 uppercase tracking-wider text-[10px]">Give</span>
            <h2 class="text-2xl font-bold my-2">Partner With God</h2>
            <p class="text-white/80 text-sm mb-5 leading-relaxed">
              There's no telling what impact you will make as you join us in partnership with God.
            </p>
            <NuxtLink to="/givings" class="bg-white text-[#1a237e] px-5 py-2.5 rounded-full font-semibold text-xs hover:bg-gray-100 transition shadow-md inline-block">
              Partner Now
            </NuxtLink>
          </div>
        </div>
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100">
          <span class="purple-text text-[10px]">Social</span>
          <h2 class="text-xl font-bold mt-1 mb-1">Follow Us</h2>
          <p class="text-gray-400 text-xs mb-4">Learn, engage and grow with us</p>
          <a v-for="s in followLinks" :key="s.label" :href="s.href" target="_blank"
            class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition group">
            <div :class="`w-9 h-9 rounded-full ${s.colors} flex items-center justify-center`">
              <i :class="`fab ${s.icon} text-sm`" />
            </div>
            <span class="font-semibold text-xs">{{ s.label }}</span>
            <i class="fas fa-arrow-right text-gray-300 ml-auto group-hover:text-[#1a237e] transition text-[10px]" />
          </a>
        </div>
      </div>
      </ScrollReveal>
    </section>

    <!-- Salvation -->
    <section class="py-20 text-white relative" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 50%, #4a148c 100%)">
      <div class="absolute inset-0 bg-[url('/img/home-page-1.png')] bg-cover bg-center opacity-5" />
      <div class="max-w-3xl mx-auto px-4 text-center relative z-10">
        <span class="text-white/60 uppercase tracking-[0.2em] text-xs">Accept Christ</span>
        <h2 class="text-2xl md:text-3xl font-bold mt-2 mb-2">Prayer for Salvation</h2>
        <h3 class="text-sm text-white/80 mb-5">Say These Words:</h3>
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-8 text-white/90 text-sm leading-relaxed italic">
          "Dear Heavenly Father, I believe in Jesus Christ your son. I believe He died and was raised again for me.
          I believe He is alive today and I confess with my mouth, that from today, Jesus is the Lord of my life.
          I receive eternal life into my spirit. I am a child of God. I am born again. Glory to God!"
        </div>
        <p class="text-white/60 text-xs mb-5">If you said this prayer, we'd love to hear from you. Fill in your details below:</p>
        <SalvationForm />
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: msgData } = useFetch('/api/messages?page=1')
const { data: wordData } = useFetch('/api/word-of-the-year')
const { data: galleryData } = useFetch('/api/gallery')
const { data: newsData } = useFetch('/api/news?page=1')
const { data: testimonyData } = useFetch('/api/testimonies')

const messages = computed(() => msgData.value?.messages?.slice(0, 6) || [])
const wordOfTheYear = computed(() => wordData.value)
const galleryImages = computed(() => (galleryData.value?.photos || []).slice(0, 8).map(p => p.img))
const news = computed(() => newsData.value?.news?.slice(0, 3) || [])
const testimonies = computed(() => testimonyData.value?.testimonies?.slice(0, 3) || [])

const serviceTimes = [
  { icon: 'fa-sun', color: 'text-yellow-500 bg-yellow-50', title: 'Sunday Service', time: '9:00 AM WAT' },
  { icon: 'fa-pray', color: 'text-purple-500 bg-purple-50', title: 'Prayer Meeting', time: 'Friday 5:00 PM' },
]

const countdown = ref([])
const updateCountdown = () => {
  const now = new Date()
  const next = new Date()
  const day = now.getDay() // 0=Sun
  const daysUntilSunday = day === 0 ? 7 : 7 - day
  next.setDate(now.getDate() + daysUntilSunday)
  next.setHours(9, 0, 0, 0)
  const diff = next - now
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  countdown.value = [
    { label: 'Days', value: String(d).padStart(2, '0') },
    { label: 'Hours', value: String(h).padStart(2, '0') },
    { label: 'Mins', value: String(m).padStart(2, '0') },
    { label: 'Secs', value: String(s).padStart(2, '0') },
  ]
}
let timer
onMounted(() => { updateCountdown(); timer = setInterval(updateCountdown, 1000) })
onUnmounted(() => clearInterval(timer))
const followLinks = [
  { href: 'https://youtube.com/@aocmizioncity', icon: 'fa-youtube', label: 'YouTube', colors: 'bg-red-50 text-red-500' },
  { href: 'https://instagram.com/aocmizioncity', icon: 'fa-instagram', label: 'Instagram', colors: 'bg-pink-50 text-pink-500' },
  { href: 'https://www.facebook.com/aocmizioncity', icon: 'fa-facebook', label: 'Facebook', colors: 'bg-blue-50 text-blue-600' },
  { href: 'https://twitter.com/aocmizioncity', icon: 'fa-twitter', label: 'Twitter', colors: 'bg-sky-50 text-sky-400' },
]

</script>

<style scoped>
.woty-img {
  opacity: 0;
  animation: slideInLeft 0.7s ease forwards 0.1s;
}
.woty-text {
  opacity: 0;
  animation: slideInRight 0.7s ease forwards 0.3s;
}
.tcard {
  opacity: 0;
  animation: fadeUp 0.6s ease forwards;
}
.htcard {
  opacity: 0;
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  transition: transform 0.3s, box-shadow 0.3s;
}
.htcard:hover {
  transform: translateY(-6px);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>
