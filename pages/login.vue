<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
    <div class="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
      <div class="text-center mb-8">
        <img src="/img/logo.png" alt="AOCMI" class="h-20 mx-auto mb-4" />
        <h1 class="text-2xl font-bold text-gray-800">Admin Login</h1>
        <p class="text-gray-400 text-sm mt-1">Sign in to your dashboard</p>
      </div>
      <p v-if="error" class="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">{{ error }}</p>
      <form @submit.prevent="submit" class="space-y-4">
        <input v-model="email" name="email" type="email" placeholder="Email" required
          class="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <input v-model="password" name="password" type="password" placeholder="Password" required
          class="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
        <button :disabled="loading" class="w-full bg-[#1a237e] text-white py-3.5 rounded-full font-bold hover:bg-[#283593] transition disabled:opacity-50">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </div>
    <ToastContainer />
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const { login } = useAuth()

const submit = async () => {
  loading.value = true
  error.value = ''
  try {
    await login(email.value, password.value)
    await navigateTo('/admin')
  } catch {
    error.value = 'Invalid credentials or account suspended.'
  }
  loading.value = false
}
</script>
