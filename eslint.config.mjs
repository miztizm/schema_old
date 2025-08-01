// @ts-check
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt()
  .override('nuxt/vue/rules', {
    rules: {
      'vue/no-v-html': 'error',
      'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: 1 }]
    }
  })
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }).override('base', {
    rules: {
      'indent': 'off', // Disable indentation checks
      'comma-dangle': 'off' // Disable trailing commas
    }
  })
