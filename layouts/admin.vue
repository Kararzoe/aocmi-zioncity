<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-primary text-white p-4 flex justify-between items-center md:hidden">
      <span class="font-bold">AOCMI Admin</span>
      <button @click="open = !open"><i class="fas fa-bars text-xl" /></button>
    </div>
    <div class="flex">
      <aside :class="['w-64 bg-white min-h-screen shadow-lg fixed md:static z-50', open ? 'block' : 'hidden md:block']">
        <div class="p-4 text-center border-b">
          <img src="/img/logo.png" alt="AOCMI" class="h-12 mx-auto" />
        </div>
        <nav class="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
          <template v-if="user?.isSuperAdmin">
            <NuxtLink v-for="l in superAdminLinks" :key="l.href" :to="l.href"
              class="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-sm">
              <i :class="`fas ${l.icon} text-yellow-500 w-5`" />{{ l.label }}
            </NuxtLink>
          </template>
          <NuxtLink v-for="l in adminLinks" :key="l.href" :to="l.href"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-sm">
            <i :class="`fas ${l.icon} text-yellow-500 w-5`" />{{ l.label }}
          </NuxtLink>
          <button @click="logout"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-sm w-full text-red-500">
            <i class="fas fa-power-off w-5" /> Logout
          </button>
        </nav>
      </aside>
      <main class="flex-1 p-6 md:ml-0">
        <div v-if="user" class="bg-primary text-white p-4 rounded-lg mb-6">
          <h6 class="font-bold">Welcome, {{ user.name }}</h6>
        </div>
        <slot />
      </main>
    </div>
    <ToastContainer />
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const { user, fetchUser, logout } = useAuth()
const open = ref(false)

onMounted(fetchUser)

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: 'fa-tv' },
  { href: '/admin/salvation-entries', label: 'Salvation Entries', icon: 'fa-envelope' },
  { href: '/admin/healing-school', label: 'Healing School', icon: 'fa-envelope' },
  { href: '/admin/messages', label: 'Messages', icon: 'fa-music' },
  { href: '/admin/sermon-series', label: 'Sermon Series', icon: 'fa-layer-group' },
  { href: '/admin/events', label: 'Events', icon: 'fa-calendar' },
  { href: '/admin/store', label: 'Store', icon: 'fa-book' },
  { href: '/admin/music', label: 'Music', icon: 'fa-music' },
  { href: '/admin/word-of-the-year', label: 'Word of the Year', icon: 'fa-star' },
  { href: '/admin/givings', label: 'Givings', icon: 'fa-hand-holding-heart' },
  { href: '/admin/devotionals', label: 'Devotionals', icon: 'fa-book-open' },
  { href: '/admin/workers', label: 'Workers', icon: 'fa-user' },
  { href: '/admin/gallery', label: 'Gallery', icon: 'fa-images' },
  { href: '/admin/prayer-requests', label: 'Prayer Requests', icon: 'fa-pray' },
  { href: '/admin/testimonies', label: 'Testimonies', icon: 'fa-comment' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: 'fa-envelope-open' },
  { href: '/admin/change-password', label: 'Update Password', icon: 'fa-lock' },
]
const superAdminLinks = [
  { href: '/admin/users', label: 'Users', icon: 'fa-user-shield' },
]
</script>
