export default defineNuxtPlugin(() => {
  if (import.meta.client && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => reg.unregister())
    })
  }
})
