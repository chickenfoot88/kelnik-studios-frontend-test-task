// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
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
