import type { Config } from 'tailwindcss'
import { ciaoui } from '@ciao/theme'

export default <Partial<Config>>{
  darkMode: 'class',
  plugins: [ciaoui()],
}
