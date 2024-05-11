import type { Preview } from '@storybook/vue3'
import { themes } from '@storybook/theming'

import './tailwind.css'

const commonTheme = {
  brandTitle: 'CiaoUI',
  brandUrl: '',
  brandTarget: '_self',
}

const parameters: Preview['parameters'] = {
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  docs: {
    // theme: themes.dark,
  },
  darkMode: {
    current: 'dark',
    stylePreview: true,
    darkClass: 'dark',
    lightClass: 'light',
    classTarget: 'html',
    dark: {
      ...themes.dark,
      ...commonTheme,
      appBg: '#161616',
      barBg: 'black',
      background: 'black',
      appContentBg: 'black',
      appBorderRadius: 14,
    },
    light: {
      ...themes.light,
      ...commonTheme,
      appBorderRadius: 14,
    },
  },
}

const preview: Preview = {
  parameters,
}

export default preview
