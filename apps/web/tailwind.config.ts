import type { Config } from 'tailwindcss'
import { ciaoui } from '@ciao/vue'

export default <Partial<Config>>{
  darkMode: 'class',
  plugins: [ciaoui()],
}
