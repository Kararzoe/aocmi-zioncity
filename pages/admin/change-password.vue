<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Change Password</h2>
    <p v-if="msg" :class="['text-sm mb-4', success ? 'text-green-600' : 'text-red-500']">{{ msg }}</p>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow space-y-4 max-w-md">
      <input v-model="form.currentPassword" type="password" placeholder="Current Password" required class="w-full border p-3 rounded" />
      <input v-model="form.newPassword" type="password" placeholder="New Password" required class="w-full border p-3 rounded" />
      <input v-model="form.confirmPassword" type="password" placeholder="Confirm New Password" required class="w-full border p-3 rounded" />
      <button :disabled="loading" class="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
        {{ loading ? 'Updating...' : 'Update Password' }}
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const form = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })
const loading = ref(false)
const msg = ref('')
const success = ref(false)

const submit = async () => {
  if (form.newPassword !== form.confirmPassword) { msg.value = 'Passwords do not match'; success.value = false; return }
  loading.value = true
  try {
    await $fetch('/api/auth/change-password', { method: 'POST', body: { currentPassword: form.currentPassword, newPassword: form.newPassword } })
    msg.value = 'Password updated successfully!'
    success.value = true
    Object.assign(form, { currentPassword: '', newPassword: '', confirmPassword: '' })
  } catch (e) { msg.value = e.data?.message || 'Failed to update password'; success.value = false }
  loading.value = false
}
useHead({ title: 'Change Password' })
</script>
