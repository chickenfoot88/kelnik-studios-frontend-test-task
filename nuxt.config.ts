// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['styles/main.sass', 'styles/reset.sass'],
  alias: {
  'images': fileURLToPath(new URL('./app/assets/images', import.meta.url)),
  'styles': fileURLToPath(new URL('./app/assets/styles', import.meta.url)),
  'fonts': fileURLToPath(new URL('./app/assets/fonts', import.meta.url)),
  },
})

