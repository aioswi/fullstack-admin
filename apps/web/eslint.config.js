import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  vue: {
    overrides: {
      'no-undef': 'off',
    },
  },
})
