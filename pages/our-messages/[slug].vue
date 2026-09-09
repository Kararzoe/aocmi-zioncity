<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <span class="text-white/60 uppercase tracking-[0.2em] text-sm">Message</span>
      <h1 class="text-3xl md:text-4xl font-bold mt-2 max-w-3xl mx-auto px-4">{{ message?.title }}</h1>
    </div>
    <div v-if="message" class="max-w-3xl mx-auto px-4 py-12">
      <img :src="message.image" :alt="message.title" class="rounded-2xl w-full shadow-xl mb-8 object-cover max-h-80" />
      <span v-if="message.series" class="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-4 inline-block">{{ message.series.title }}</span>
      <p class="text-gray-500 text-sm leading-relaxed mb-8">{{ message.description }}</p>
      <a :href="message.link" target="_blank"
        class="bg-[#1a237e] text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-3 hover:bg-[#283593] transition shadow-lg">
        <i class="fas fa-download" /> Download / Listen
      </a>
      <div class="mt-10">
        <NuxtLink to="/our-messages" class="text-[#1a237e] text-sm font-semibold hover:underline">
          ← Back to Messages
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: message } = await useFetch(`/api/messages/${route.params.slug}`)
if (!message.value) throw createError({ statusCode: 404, message: 'Message not found' })
useHead({ title: message.value?.title })
</script>
