<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Event</span>
      <h1 class="text-3xl md:text-4xl font-bold mt-2 max-w-3xl mx-auto px-4">{{ event?.title }}</h1>
    </div>
    <div v-if="event" class="max-w-3xl mx-auto px-4 py-12">
      <img :src="`/uploads/events/${event.image}`" :alt="event.title" class="rounded-2xl w-full shadow-xl mb-6 object-cover max-h-80" />
      <div class="flex items-center gap-2 mb-4">
        <i class="fas fa-calendar text-[#1a237e]" />
        <span class="text-sm font-semibold text-[#1a237e]">{{ event.dateOfEvent }}</span>
      </div>
      <p class="text-gray-500 text-sm leading-relaxed mb-8">{{ event.description }}</p>
      <NuxtLink to="/events" class="text-[#1a237e] text-sm font-semibold hover:underline">← Back to Events</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: event } = await useFetch(`/api/events/${route.params.slug}`)
if (!event.value) throw createError({ statusCode: 404, message: 'Event not found' })
useHead({ title: event.value?.title })
</script>
