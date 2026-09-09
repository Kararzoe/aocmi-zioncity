export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'AOCMI Zion City — Ambassadors of Christ Ministries International',
      meta: [
        { name: 'description', content: "Ambassadors of Christ Ministries International (Zion City) — devoted to expository preaching and teaching of God's word." },
        { name: 'keywords', content: 'AOCMI, Zion City, church in Jos, Ambassadors of Christ, Ministries International' },
        { name: 'theme-color', content: '#1a237e' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css' },
        { rel: 'icon', href: '/img/logo.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
    },
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'aocmi-zioncity-secret-key-2024',
    adminDefaultPassword: process.env.ADMIN_DEFAULT_PASSWORD || 'password',
    public: {},
  },
  nitro: {
    experimental: { wasm: false },
  },
})
