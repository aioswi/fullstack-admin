import type { ThemeColors } from './colors/types'

export type DefaultThemeType = 'light' | 'dark'

export interface BaseThemeUnit {
  small?: string
  medium?: string
  large?: string
}

export type FontUnit = BaseThemeUnit & {
  tiny?: string
}

export const spacingScaleKeys = [
  '0',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
  '1',
  '2',
  '3',
  '3.5',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
  '52',
  '56',
  '60',
  '64',
  '72',
  '80',
  '96',
]

export const mappedSpacingScaleKeys = spacingScaleKeys.map(key => `unit-${key}`)

export type SpacingScaleKeys = (typeof spacingScaleKeys)[number]

export type SpacingScale = Partial<Record<SpacingScaleKeys, string>>

export interface LayoutTheme {
  /**
   * 定义组件间距基本单位
   *
   * @default 4 (px)
   */
  spacingUnit?: number
  /**
   * 默认字体大小
   *
   * @default
   * {
   *  tiny: "0.75rem",
   *  small: "0.875rem",
   *  medium: "1rem",
   *  large: "1.125rem",
   *  DEFAULT: "1rem"
   * }
   */
  fontSize?: FontUnit
  /**
   * 默认行高
   *
   * @default
   * {
   *  tiny: "1rem",
   *  small: "1.25rem",
   *  medium: "1.5rem",
   *  large: "1.75rem",
   *  DEFAULT: "1.5rem"
   * }
   */
  lineHeight?: FontUnit
  /**
   * 默认圆角尺寸
   *
   * @default
   * {
   *  small: "0.25rem",
   *  medium: "0.5rem",
   *  large: "0.75rem",
   * }
   */
  radius?: BaseThemeUnit
  /**
   * 默认组件禁用透明度
   *
   * format: ".[value]"
   *
   * @default .5
   */
  disabledOpacity?: string | number
  /**
   * 默认组件悬停透明度
   *
   * format: ".[value]"
   *
   * @default .5
   */
  hoverOpacity?: string | number
  /**
   * 分割线组件的默认高度
   *
   * @default 1px
   */
  dividerWeight?: string
  /**
   * 默认边框宽度
   *
   * @default
   * {
   *  small: "1px",
   *  medium: "2px",
   *  large: "3px",
   * }
   */
  borderWidth?: BaseThemeUnit
  /**
   * 默认阴影
   *
   * @default
   * {
   *  small: 0px 0px 5px 0px rgb(0 0 0 / 0.01), 0px 2px 10px 0px rgb(0 0 0 / 0.06),
   *  medium: 0px 0px 15px 0px rgb(0 0 0 / 0.02), 0px 2px 30px 0px rgb(0 0 0 / 0.08),
   *  large: 0px 0px 30px 0px rgb(0 0 0 / 0.03), 0px 30px 60px 0px rgb(0 0 0 / 0.12),
   * }
   */
  boxShadow?: BaseThemeUnit
}

export interface ConfigTheme {
  extend?: 'light' | 'dark'
  layout?: LayoutTheme
  colors?: Partial<ThemeColors>
}

export type ConfigThemes = Record<string, ConfigTheme>

export interface CiaoUIPluginConfig {
  /**
   * css 前缀
   * @default ciaoui
   */
  prefix?: string
  /**
   * 是否使用默认颜色配置
   * @default true
   */
  useDefaultColors?: boolean
  /**
   * 通用 layout 配置，具体查看 `LayoutTheme` 定义
   */
  layout?: LayoutTheme
  /**
   * 主题配置
   */
  themes?: ConfigThemes
  /**
   * 默认主题
   * @default "light"
   */
  defaultTheme?: DefaultThemeType
  /**
   * 默认扩展主题
   * @default "light"
   */
  defaultExtendTheme?: DefaultThemeType
}
