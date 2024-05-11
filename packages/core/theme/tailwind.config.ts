import type { Config } from 'tailwindcss'
import { ciaoui } from './src'

export default <Partial<Config>>{
  content: ['./stories/*.{vue,ts}'],
  darkMode: 'class',
  plugins: [ciaoui()],
}
