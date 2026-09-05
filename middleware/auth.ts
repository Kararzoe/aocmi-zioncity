export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  const { data } = await useFetch('/api/auth/me', { server: false })
  if (!data.value?.user) return navigateTo('/login')
})
