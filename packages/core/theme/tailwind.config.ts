import type { Config } from 'tailwindcss'
import { ciaoui } from './src'

export default <Partial<Config>>{
  content: [
    './src/utils/**/*.ts',
    './src/components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  plugins: [ciaoui()],
}
