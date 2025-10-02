// https://nuxt.com/docs/api/configuration/nuxt-config

const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
    },
    baseURL: isProd ? '/kelnik-studios-frontend-test-task/' : '/',
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
