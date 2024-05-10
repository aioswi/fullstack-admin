import type { Config } from 'tailwindcss'
import { ciaoui } from '@ciao/theme'

export default <Partial<Config>>{
  content: [
    './stories/*.mdx',
    '../components/*/src/**/*.{js,jsx,ts,tsx,vue}',
    '../components/*/stories/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  plugins: [ciaoui()],
}
