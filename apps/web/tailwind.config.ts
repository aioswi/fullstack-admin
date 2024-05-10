import type { Config } from 'tailwindcss'
import { ciaoui } from '@ciao/theme'

export default <Partial<Config>>{
  content: [
    './pages/**/*.{js,ts,jsx,tsx,vue}',
    './components/**/*.{js,ts,jsx,tsx,vue}',
    '../../packages/components/**/*.{js,ts,jsx,tsx,vue}',
  ],
  darkMode: 'class',
  plugins: [ciaoui()],
}
