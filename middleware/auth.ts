export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  try {
    const { data } = await useFetch('/api/auth/me')
    if (!data.value?.user) return navigateTo('/login')
  } catch {
    return navigateTo('/login')
  }
})
