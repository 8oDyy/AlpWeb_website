// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Vue specific rules
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
  },
})
