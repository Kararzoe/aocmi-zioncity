export const useToast = () => {
  const toasts = useState<{ id: number; msg: string; type: 'success' | 'error' }[]>('toasts', () => [])

  const show = (msg: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now()
    toasts.value.push({ id, msg, type })
    setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 3500)
  }

  return { toasts, success: (msg: string) => show(msg, 'success'), error: (msg: string) => show(msg, 'error') }
}
