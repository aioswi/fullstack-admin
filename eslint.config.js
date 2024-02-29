import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  vue: {
    overrides: {
      'no-undef': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 1,
        },
      }],
    },
  },
})
