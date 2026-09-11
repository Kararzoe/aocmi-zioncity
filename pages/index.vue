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
          The joy of being in God's presence is an unparalleled experience
        </p>
        <div class="animate-fade-in-up animate-delay-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://youtube.com/@aocmizioncity" target="_blank"
            class="bg-red-600 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-red-700 transition-all duration-300 shadow-lg inline-flex items-center gap-2">
            <i class="fab fa-youtube" /> Watch Live
          </a>
          <a href="https://t.me/zioncitymessages" target="_blank" class="btn-blue text-sm inline-flex items-center gap-2">
            <i class="fab fa-telegram" /> Join Telegram
          </a>
        </div>
      </div>
    </div>

    <!-- Service Times -->
    <section class="bg-white relative z-10 -mt-14">
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-white rounded-2xl shadow-xl p-5 md:p-7 grid grid-cols-2 gap-4">
          <div v-for="s in serviceTimes" :key="s.title" class="flex items-center gap-3">
            <div :class="`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${s.color}`">
              <i :class="`fas ${s.icon} text-lg`" />
            </div>
            <div>
              <p class="font-bold text-xs md:text-sm">{{ s.title }}</p>
              <p class="text-gray-400 text-[11px] md:text-xs">{{ s.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Online -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span class="purple-text">Online</span>
          <h2 class="text-2xl md:text-3xl font-bold my-3">Join Our Service Online</h2>
          <p class="text-gray-500 text-sm mb-6 leading-relaxed">
            Join us for powerful worship experience and practical teachings of God's word like never before.
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="https://youtube.com/@aocmizioncity" target="_blank"
              class="bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold text-xs inline-flex items-center gap-2 hover:bg-red-700 transition shadow-md">
              <i class="fab fa-youtube" /> YouTube
            </a>
            <NuxtLink to="/events" class="btn-blue text-xs">Upcoming Events</NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <img src="/img/church-1.jpg" alt="Service" loading="lazy" class="rounded-xl w-full h-40 object-cover shadow-md" />
          <img src="/img/church-2.jpg" alt="Service" loading="lazy" class="rounded-xl w-full h-40 object-cover shadow-md mt-6" />
          <img src="/img/church-3.jpg" alt="Service" loading="lazy" class="rounded-xl w-full h-40 object-cover shadow-md -mt-6" />
          <img src="/img/church-4.jpg" alt="Service" loading="lazy" class="rounded-xl w-full h-40 object-cover shadow-md" />
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="py-16">
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
    </section>

    <!-- Messages -->
    <section class="py-16 bg-blue-gradient text-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="text-white/60 uppercase tracking-wider text-xs">Listen & Learn</span>
          <h2 class="text-2xl md:text-3xl font-bold mt-2">Download & Listen to Our Latest Messages</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          <NuxtLink v-for="m in messages" :key="m.id" :to="`/our-messages/${m.slug}`" class="messages-link group">
            <div class="card-hover bg-white text-gray-800">
              <div class="overflow-hidden">
                <img :src="m.image" :alt="m.title" loading="lazy"
                  class="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-xs md:text-sm mb-1">{{ m.title.length > 35 ? m.title.slice(0, 35) + '...' : m.title }}</h3>
                <p class="text-[10px] md:text-xs text-gray-400 mb-2">{{ new Date(m.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
                <span class="text-[#1a237e] text-[10px] md:text-xs font-semibold group-hover:underline">Listen Now →</span>
              </div>
            </div>
          </NuxtLink>
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
    <section v-if="wordOfTheYear" class="py-16">
      <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-5 gap-8 items-center">
        <div class="md:col-span-3">
          <img :src="wordOfTheYear.img" alt="Word of the Year" loading="lazy" class="rounded-2xl w-full shadow-xl" />
        </div>
        <div class="md:col-span-2">
          <span class="purple-text">Prophetic Declaration</span>
          <h2 class="text-2xl md:text-3xl font-bold my-3">Word of the Year</h2>
          <h3 class="text-lg text-[#1a237e] font-bold mb-3">{{ wordOfTheYear.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ wordOfTheYear.description }}</p>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-8">
          <span class="purple-text">Pictorial Moments</span>
          <h2 class="section-title mt-2">Live at AOCMI-ZIONCITY</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="src in galleryImages" :key="src" class="overflow-hidden rounded-xl shadow-sm group">
            <img :src="src" alt="AOCMI" loading="lazy" class="w-full h-36 md:h-44 object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
        <div class="text-center mt-7">
          <NuxtLink to="/gallery" class="btn-blue text-xs">View Full Gallery &nbsp;<i class="fas fa-arrow-right text-[10px]" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- Partner + Follow -->
    <section class="py-16">
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
const { data: msgData } = await useFetch('/api/messages?page=1')
const { data: wordData } = await useFetch('/api/word-of-the-year')
const { data: galleryData } = await useFetch('/api/gallery')

const messages = computed(() => msgData.value?.messages?.slice(0, 6) || [])
const wordOfTheYear = computed(() => wordData.value)
const galleryImages = computed(() => (galleryData.value?.photos || []).slice(0, 8).map(p => p.img))

const serviceTimes = [
  { icon: 'fa-sun', color: 'text-yellow-500 bg-yellow-50', title: 'Sunday Service', time: '9:00 AM WAT' },
  { icon: 'fa-pray', color: 'text-purple-500 bg-purple-50', title: 'Prayer Meeting', time: 'Friday 5:00 PM' },
]
const followLinks = [
  { href: 'https://youtube.com/@aocmizioncity', icon: 'fa-youtube', label: 'YouTube', colors: 'bg-red-50 text-red-500' },
  { href: 'https://instagram.com/aocmizioncity', icon: 'fa-instagram', label: 'Instagram', colors: 'bg-pink-50 text-pink-500' },
  { href: 'https://www.facebook.com/aocmizioncity', icon: 'fa-facebook', label: 'Facebook', colors: 'bg-blue-50 text-blue-600' },
  { href: 'https://twitter.com/aocmizioncity', icon: 'fa-twitter', label: 'Twitter', colors: 'bg-sky-50 text-sky-400' },
]
</script>
