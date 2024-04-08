import { readableColor } from 'color2k'
import { swapColorValues } from '../utils/object'
import type { SemanticBaseColors, ThemeColors } from './types'
import { commonColors as common } from './common'

const base: SemanticBaseColors = {
  light: {
    background: {
      DEFAULT: '#ffffff',
    },
    foreground: {
      ...common.zinc,
      DEFAULT: '#11181c',
    },
    divider: {
      DEFAULT: 'rgba(17, 17, 17, 0.15)',
    },
    focus: {
      DEFAULT: common.blue[500],
    },
    overlay: {
      DEFAULT: '#000000',
    },
    title: {
      DEFAULT: '#ffffff',
      foreground: '#11181c',
    },
    subtitle: {
      DEFAULT: common.zinc[100],
      foreground: common.zinc[800],
    },
    content: {
      DEFAULT: common.zinc[200],
      foreground: common.zinc[700],
    },
    description: {
      DEFAULT: common.zinc[300],
      foreground: common.zinc[600],
    },
  },
  dark: {
    background: {
      DEFAULT: '#000000',
    },
    foreground: {
      ...common.zinc,
      DEFAULT: '#ecedee',
    },
    divider: {
      DEFAULT: 'rgba(255, 255, 255, 0.15)',
    },
    focus: {
      DEFAULT: common.blue[500],
    },
    overlay: {
      DEFAULT: '#000000',
    },
    title: {
      DEFAULT: common.zinc[900],
      foreground: common.zinc[50],
    },
    subtitle: {
      DEFAULT: common.zinc[800],
      foreground: common.zinc[100],
    },
    content: {
      DEFAULT: common.zinc[700],
      foreground: common.zinc[200],
    },
    description: {
      DEFAULT: common.zinc[600],
      foreground: common.zinc[300],
    },
  },
}

export const themeColorsLight: ThemeColors = {
  ...base.light,
  default: {
    ...common.zinc,
    foreground: readableColor(common.zinc[300]),
    DEFAULT: common.zinc[300],
  },
  primary: {
    ...common.blue,
    foreground: readableColor(common.blue[500]),
    DEFAULT: common.blue[500],
  },
  secondary: {
    ...common.purple,
    foreground: readableColor(common.purple[500]),
    DEFAULT: common.purple[500],
  },
  success: {
    ...common.green,
    foreground: readableColor(common.green[500]),
    DEFAULT: common.green[500],
  },
  warning: {
    ...common.yellow,
    foreground: readableColor(common.yellow[500]),
    DEFAULT: common.yellow[500],
  },
  danger: {
    ...common.red,
    foreground: common.white,
    DEFAULT: common.red[500],
  },
}

export const themeColorsDark: ThemeColors = {
  ...base.dark,
  default: {
    ...swapColorValues(common.zinc),
    foreground: readableColor(common.zinc[700]),
    DEFAULT: common.zinc[700],
  },
  primary: {
    ...swapColorValues(common.blue),
    foreground: readableColor(common.blue[500]),
    DEFAULT: common.blue[500],
  },
  secondary: {
    ...swapColorValues(common.purple),
    foreground: readableColor(common.purple[400]),
    DEFAULT: common.purple[400],
  },
  success: {
    ...swapColorValues(common.green),
    foreground: readableColor(common.green[500]),
    DEFAULT: common.green[500],
  },
  warning: {
    ...swapColorValues(common.yellow),
    foreground: readableColor(common.yellow[500]),
    DEFAULT: common.yellow[500],
  },
  danger: {
    ...swapColorValues(common.red),
    foreground: common.white,
    DEFAULT: common.red[500],
  },
}

export const semanticColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
}
