<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Testimonies</h1>
    <div class="flex gap-2 mb-6">
      <button v-for="f in ['pending', 'approved']" :key="f" @click="filter = f"
        :class="['px-4 py-2 rounded-full text-sm capitalize font-medium transition', filter === f ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
        {{ f }} ({{ testimonies.filter(t => f === 'pending' ? !t.approved : t.approved).length }})
      </button>
    </div>
    <p v-if="!filtered.length" class="text-gray-400 text-center py-8">No {{ filter }} testimonies</p>
    <div class="space-y-4">
      <div v-for="t in filtered" :key="t.id" class="bg-white rounded-xl shadow-sm p-5">
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="font-bold">{{ t.name }}</p>
            <p class="text-gray-400 text-xs">{{ t.email }} · {{ new Date(t.createdAt).toLocaleDateString() }}</p>
          </div>
          <span :class="['text-xs px-2 py-1 rounded-full', t.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700']">
            {{ t.approved ? 'Approved' : 'Pending' }}
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-4">{{ t.testimony }}</p>
        <div class="flex gap-2">
          <button v-if="!t.approved" @click="toggle(t.id, true)" class="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700">Approve</button>
          <button v-else @click="toggle(t.id, false)" class="bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-yellow-600">Unapprove</button>
          <button @click="remove(t.id)" class="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const filter = ref('pending')
const { data, refresh } = await useFetch('/api/testimonies?admin=true')
const testimonies = computed(() => data.value?.testimonies || [])
const filtered = computed(() => testimonies.value.filter(t => filter.value === 'pending' ? !t.approved : t.approved))

const toggle = async (id, approved) => {
  await $fetch('/api/testimonies', { method: 'PUT', body: { id, approved } })
  refresh()
}
const remove = async (id) => {
  if (!confirm('Delete?')) return
  await $fetch('/api/testimonies', { method: 'DELETE', body: { id } })
  refresh()
}
useHead({ title: 'Admin — Testimonies' })
</script>
