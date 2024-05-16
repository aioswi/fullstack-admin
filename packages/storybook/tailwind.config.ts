import type { Config } from 'tailwindcss'
import { ciaoui } from '@ciao/theme'

export default <Partial<Config>>{
  content: [
    './stories/*.mdx',
    '../components/*/src/**/*.{js,jsx,ts,tsx,vue}',
    '../components/*/stories/**/*.{js,jsx,ts,tsx}',
    '../core/theme/stories/**/*.{js,jsx,ts,tsx,vue}',
    '../core/theme/src/components/**/*.{js,jsx,ts,tsx}',
    '../core/theme/src/utils/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  plugins: [ciaoui()],
}
