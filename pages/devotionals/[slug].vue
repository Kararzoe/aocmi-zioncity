<template>
  <div>
    <div class="pt-32 pb-20 text-white text-center" style="background: linear-gradient(135deg, #0a1128 0%, #1a237e 100%)">
      <p v-if="d?.scripture" class="text-white/60 text-sm mb-2">{{ d.scripture }}</p>
      <h1 class="text-3xl md:text-4xl font-bold mt-2 max-w-3xl mx-auto px-4">{{ d?.title }}</h1>
    </div>
    <div v-if="d" class="max-w-3xl mx-auto px-4 py-12">
      <img v-if="d.image" :src="`/uploads/devotionals/${d.image}`" :alt="d.title" class="rounded-2xl w-full shadow-xl mb-8 max-h-80 object-cover" />
      <div class="prose prose-sm max-w-none text-gray-600 leading-relaxed" v-html="d.content" />
      <div class="mt-10">
        <NuxtLink to="/devotionals" class="text-[#1a237e] text-sm font-semibold hover:underline">← Back to Apokalupsis</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: d } = await useFetch(`/api/devotionals?slug=${route.params.slug}`)
if (!d.value) throw createError({ statusCode: 404, message: 'Not found' })
useHead({ title: d.value?.title })
</script>
