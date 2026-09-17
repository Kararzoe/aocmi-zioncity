<template>
  <div ref="el" :class="['reveal', { visible: isVisible }, animClass]" :style="{ transitionDelay: delay }">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  anim: { type: String, default: 'fadeUp' }, // fadeUp | fadeLeft | fadeRight | fadeIn | zoomIn
  delay: { type: String, default: '0s' },
})

const el = ref(null)
const isVisible = ref(false)
const animClass = computed(() => `reveal-${props.anim}`)

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { isVisible.value = true; observer.disconnect() }
  }, { threshold: 0.12 })
  if (el.value) observer.observe(el.value)
})
</script>

<style>
.reveal { opacity: 0; will-change: transform, opacity; transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1); }
.reveal.visible { opacity: 1 !important; transform: none !important; }

.reveal-fadeUp    { transform: translateY(40px); }
.reveal-fadeLeft  { transform: translateX(-50px); }
.reveal-fadeRight { transform: translateX(50px); }
.reveal-fadeIn    { transform: none; }
.reveal-zoomIn    { transform: scale(0.88); }
</style>
