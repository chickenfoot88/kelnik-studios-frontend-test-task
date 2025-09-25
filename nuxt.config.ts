// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/styles/main.sass'],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: [
            '@use "~/assets/styles/_variables.sass" as *',
            '@use "~/assets/styles/_utils.sass" as *',
            '',
          ].join('\n'),
        },
      },
    },
  },
})
