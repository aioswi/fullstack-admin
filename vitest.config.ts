import Vue from '@vitejs/plugin-vue'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [
    Vue(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      enabled: true,
      reporters: ['html'],
      exclude: [
        '**/*/index.ts',
        '**/app.vue',
        '**/index.vue',
        '**/*.config.ts',
        '**/*.workspace.ts',
        '**/.nuxt',
        '**/stories/*',
        'packages/storybook',
      ],
    },
  },
})
