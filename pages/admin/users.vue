<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Users</h2>
    <form @submit.prevent="create" class="bg-white p-4 rounded-lg shadow mb-6 space-y-3 max-w-xl">
      <h3 class="font-bold">Create New User</h3>
      <input v-model="form.name" placeholder="Name" required class="w-full border p-3 rounded" />
      <input v-model="form.email" type="email" placeholder="Email" required class="w-full border p-3 rounded" />
      <input v-model="form.password" type="password" placeholder="Password" required class="w-full border p-3 rounded" />
      <label class="flex items-center gap-2 text-sm">
        <input v-model="form.isSuperAdmin" type="checkbox" /> Super Admin
      </label>
      <button :disabled="loading" class="bg-primary text-white px-4 py-2 rounded disabled:opacity-50">
        {{ loading ? '...' : 'Create User' }}
      </button>
    </form>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Role</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id" class="border-t">
            <td class="p-3">{{ u.name }}</td>
            <td class="p-3">{{ u.email }}</td>
            <td class="p-3">{{ u.isSuperAdmin ? 'Super Admin' : 'Admin' }}</td>
            <td class="p-3">{{ u.suspended ? 'Suspended' : 'Active' }}</td>
            <td class="p-3 flex gap-2">
              <button @click="toggleSuspend(u)" class="text-yellow-600 text-xs">{{ u.suspended ? 'Unsuspend' : 'Suspend' }}</button>
              <button @click="del(u.id)" class="text-red-500 text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const form = reactive({ name: '', email: '', password: '', isSuperAdmin: false })
const loading = ref(false)
const { data, refresh } = await useFetch('/api/users')
const users = computed(() => data.value?.users || [])

const create = async () => {
  loading.value = true
  await $fetch('/api/users', { method: 'POST', body: { ...form } })
  Object.assign(form, { name: '', email: '', password: '', isSuperAdmin: false })
  loading.value = false
  refresh()
}
const toggleSuspend = async (u) => {
  await $fetch(`/api/users/${u.id}`, { method: 'PATCH', body: { suspended: !u.suspended } })
  refresh()
}
const del = async (id) => {
  if (!confirm('Delete user?')) return
  await $fetch(`/api/users/${id}`, { method: 'DELETE' })
  refresh()
}
useHead({ title: 'Admin — Users' })
</script>
