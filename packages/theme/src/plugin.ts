import plugin from 'tailwindcss/plugin'
import get from 'lodash.get'
import omit from 'lodash.omit'
import deepMerge from 'deepmerge'
import forEach from 'lodash.foreach'
import kebabCase from 'lodash.kebabcase'
import mapKeys from 'lodash.mapkeys'
import Color from 'color'

import type { CiaoUIPluginConfig, ConfigTheme, DefaultThemeType, LayoutTheme } from './types'
import { darkLayout, defaultLayout, lightLayout } from './default-layout'
import { flattenThemeObject, isBaseTheme } from './utils'
import { commonColors, semanticColors } from './colors'
import { animations } from './animations'
import { baseStyles } from './utils/classes'
import { utilities } from './utilities'

const DEFAULT_PREFIX = 'ciaoui'

const parsedColorsCache: Record<string, number[]> = {}

// @internal
function resolveConfig(themes: ConfigThemes = {}, defaultTheme: DefaultThemeType, prefix: string) {
  const resolved: {
    variants: { name: string, definition: string[] }[]
    utilities: Record<string, Record<string, any>>
    colors: Record<
      string,
      ({ opacityValue, opacityVariable }: { opacityValue: string, opacityVariable: string }) => string
    >
  } = {
    variants: [],
    utilities: {},
    colors: {},
  }

  for (const [themeName, { extend, layout, colors }] of Object.entries(themes)) {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`
    const scheme = themeName === 'light' || themeName === 'dark' ? themeName : extend

    if (themeName === defaultTheme)
      cssSelector = `:root,${cssSelector}`

    resolved.utilities[cssSelector] = scheme
      ? { 'color-scheme': scheme }
      : {}

    const flatColors = flattenThemeObject(colors) as Record<string, string>
    const flatLayout = layout ? mapKeys(layout, (value, key) => kebabCase(key)) : {}

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    })

    /**
     * Colors
     */
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue)
        return

      try {
        const parsedColor = parsedColorsCache[colorValue] || Color(colorValue).hsl().round().array()

        parsedColorsCache[colorValue] = parsedColor

        const [h, s, l, defaultAlphaValue] = parsedColor
        const ciaouiColorVariable = `--${prefix}-${colorName}`
        const ciaouiColorOpacityVariable = `--${prefix}-${colorName}-opacity`

        resolved.utilities[cssSelector]![ciaouiColorVariable] = `${h} ${s} ${l}`
        if (typeof defaultAlphaValue === 'number')
          resolved.utilities[cssSelector]![ciaouiColorOpacityVariable] = defaultAlphaValue.toFixed(2)
        resolved.colors[colorName] = ({ opacityVariable, opacityValue }) => {
          if (!Number.isNaN(+opacityValue))
            return `hsl(var(${ciaouiColorVariable}) / ${opacityValue})`

          if (opacityVariable)
            return `hsl(var(${ciaouiColorVariable}) / var(${ciaouiColorOpacityVariable}, var(${opacityVariable})))`

          return `hsl(var(${ciaouiColorVariable}) / var(${ciaouiColorOpacityVariable}, 1))`
        }
      }
      catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('error', error?.message)
      }
    }

    /**
     * Layout
     */
  }

  return resolved
}

function corePlugin(themes: ConfigThemes = {}, defaultTheme: DefaultThemeType, prefix: string, useDefaultColors: boolean) {
  const resolved = resolveConfig(themes, defaultTheme, prefix)

  const minSizes = {
    'unit-1': `var(--${prefix}-spacing-unit)`,
    'unit-2': `var(--${prefix}-spacing-unit-2`,
    'unit-3': `var(--${prefix}-spacing-unit-3)`,
    'unit-3.5': `var(--${prefix}-spacing-unit-3_5)`,
    'unit-4': `var(--${prefix}-spacing-unit-4)`,
    'unit-5': `var(--${prefix}-spacing-unit-5)`,
    'unit-6': `var(--${prefix}-spacing-unit-6)`,
    'unit-7': `var(--${prefix}-spacing-unit-7)`,
    'unit-8': `var(--${prefix}-spacing-unit-8)`,
    'unit-9': `var(--${prefix}-spacing-unit-9)`,
    'unit-10': `var(--${prefix}-spacing-unit-10)`,
    'unit-11': `var(--${prefix}-spacing-unit-11)`,
    'unit-12': `var(--${prefix}-spacing-unit-12)`,
    'unit-16': `var(--${prefix}-spacing-unit-16)`,
    'unit-20': `var(--${prefix}-spacing-unit-20)`,
    'unit-24': `var(--${prefix}-spacing-unit-24)`,
  }

  return plugin(({ addBase, addUtilities, addVariant }) => {
    addBase({
      ':root, [data-theme]': {
        ...baseStyles(prefix),
      },
    })

    addUtilities({ ...resolved.utilities, ...utilities })

    resolved.variants.forEach((variant) => {
      addVariant(variant.name, variant.definition)
    })
  }, {
    theme: {
      extend: {
        colors: {
          ...(useDefaultColors ? commonColors : {}),
          ...resolved?.colors,
        },
        scale: {
          80: '0.8',
          85: '0.85',
        },
        height: {
          divider: `var(--${prefix}-divider-weight)`,
        },
        width: {
          divider: `var(--${prefix}-divider-weight)`,
        },
        spacing: {
          unit: `var(--${prefix}-spacing-unit)`,
        },
        minWidth: {
          ...minSizes,
        },
        minHeight: {
          ...minSizes,
        },
        fontSize: {
          tiny: [`var(--${prefix}-font-size-tiny)`, `var(--${prefix}-line-height-tiny)`],
          small: [`var(--${prefix}-font-size-small)`, `var(--${prefix}-line-height-small)`],
          medium: [`var(--${prefix}-font-size-medium)`, `var(--${prefix}-line-height-medium)`],
          large: [`var(--${prefix}-font-size-large)`, `var(--${prefix}-line-height-large)`],
        },
        borderRadius: {
          small: `var(--${prefix}-radius-small)`,
          medium: `var(--${prefix}-radius-medium)`,
          large: `var(--${prefix}-radius-large)`,
        },
        opacity: {
          hover: `var(--${prefix}-hover-opacity)`,
          disabled: `var(--${prefix}-disabled-opacity)`,
        },
        borderWidth: {
          small: `var(--${prefix}-border-width-small)`,
          medium: `var(--${prefix}-border-width-medium)`,
          large: `var(--${prefix}-border-width-large)`,
          1: '1px',
          1.5: '1.5px',
          3: '3px',
          5: '5px',
        },
        boxShadow: {
          small: `var(--${prefix}-box-shadow-small)`,
          medium: `var(--${prefix}-box-shadow-medium)`,
          large: `var(--${prefix}-box-shadow-large)`,
        },
        backgroundImage: {
          'stripe-gradient':
            'linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, transparent 75%, transparent)',
        },
        transitionDuration: {
          0: '0ms',
          250: '250ms',
          400: '400ms',
        },
        transitionTimingFunction: {
          'soft-spring': 'cubic-bezier(0.155, 1.105, 0.295, 1.12)',
        },
        ...animations,
      },
    },
  })
}

export function ciaoui(config: CiaoUIPluginConfig = {}): ReturnType<typeof plugin> {
  const {
    themes: themeObject = {},
    defaultTheme = 'light',
    defaultExtendTheme = 'light',
    layout: userLayout,
    prefix: defaultPrefix = DEFAULT_PREFIX,
    useDefaultColors = true,
  } = config

  const userLightColors = get(themeObject, 'light.colors', {})
  const userDarkColors = get(themeObject, 'dark.colors', {})

  const defaultLayoutObj = userLayout && typeof userLayout === 'object' ? deepMerge(defaultLayout, userLayout) : defaultLayout

  const baseLayouts: { light: LayoutTheme, dark: LayoutTheme } = {
    light: {
      ...defaultLayoutObj,
      ...lightLayout,
    },
    dark: {
      ...defaultLayoutObj,
      ...darkLayout,
    },
  }

  const otherThemes = omit(themeObject, ['light', 'dark']) || {}

  forEach(otherThemes, ({ extend, colors, layout }, themeName) => {
    const baseTheme = extend && isBaseTheme(extend) ? extend : defaultExtendTheme

    if (colors && typeof colors === 'object')
      otherThemes[themeName].colors = deepMerge(semanticColors[baseTheme], colors)
    if (layout && typeof layout === 'object')
      otherThemes[themeName].layout = deepMerge(extend ? baseLayouts[extend] : defaultLayoutObj, layout)
  })

  const light: ConfigTheme = {
    layout: deepMerge(baseLayouts.light, get(themeObject, 'light.layout', {})),
    colors: deepMerge(semanticColors.light, userLightColors),
  }

  const dark: ConfigTheme = {
    layout: deepMerge(baseLayouts.dark, get(themeObject, 'dark.layout', {})),
    colors: deepMerge(semanticColors.dark, userDarkColors),
  }

  const themes = {
    light,
    dark,
    ...otherThemes,
  }

  return corePlugin(themes, defaultTheme, defaultPrefix, useDefaultColors)
}
