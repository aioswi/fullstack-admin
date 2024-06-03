import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [
    Vue(),
    VueJsx(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
})
