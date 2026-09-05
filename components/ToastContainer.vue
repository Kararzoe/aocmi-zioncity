<template>
  <div class="fixed top-4 right-4 z-[9999] space-y-2">
    <div v-for="t in toasts" :key="t.id"
      :class="['px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white animate-slide-in-up', t.type === 'success' ? 'bg-green-600' : 'bg-red-600']">
      {{ t.msg }}
    </div>
  </div>
</template>

<script setup>
const { toasts } = useToast()
</script>
