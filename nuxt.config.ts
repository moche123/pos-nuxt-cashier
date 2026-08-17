// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      // 'local': in-memory data, no backend — for trying the app as-is.
      // 'api': hits a real backend over HTTP.
      dataMode: process.env.NUXT_PUBLIC_DATA_MODE || 'local',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3333/api'
    }
  }
})
