import type { Config } from 'tailwindcss'

import { ciaoui } from '@ciao/uikit'

export default <Partial<Config>>{
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [ciaoui()],
}
