// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'vue/html-self-closing': [
      'off',
      {
        html: {
          void: 'never',
        },
      },
    ],
    semi: ['error', 'never'],
    '@/semi': ['error', 'never'],
  },
})
