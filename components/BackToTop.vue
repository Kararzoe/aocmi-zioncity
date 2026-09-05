<template>
  <button v-if="show" @click="scrollTop"
    class="fixed bottom-6 right-6 z-50 w-10 h-10 bg-[#1a237e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#283593] transition">
    <i class="fas fa-arrow-up text-sm" />
  </button>
</template>

<script setup>
const show = ref(false)
onMounted(() => window.addEventListener('scroll', () => { show.value = window.scrollY > 300 }))
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>
