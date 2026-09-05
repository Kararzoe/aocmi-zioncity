export const useAuth = () => {
  const user = useState<any>('auth_user', () => null)

  const fetchUser = async () => {
    try {
      const data = await $fetch('/api/auth/me')
      user.value = (data as any).user
    } catch {
      user.value = null
    }
  }

  const login = async (email: string, password: string) => {
    const data = await $fetch('/api/auth/login', { method: 'POST', body: { email, password } })
    user.value = (data as any).user
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/login')
  }

  return { user, fetchUser, login, logout }
}
