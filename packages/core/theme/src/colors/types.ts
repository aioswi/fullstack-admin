export type ColorScale =
  | Partial<{
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    foreground: string
    DEFAULT: string
  }>
  | string

export interface BaseColors {
  background: ColorScale
  foreground: ColorScale
  divider: ColorScale
  overlay: ColorScale
  focus: ColorScale
  // 标题
  title: ColorScale
  // 副标题
  subtitle: ColorScale
  // 文本内容颜色
  content: ColorScale
  // 文本描述颜色
  description: ColorScale
}

export type ThemeColors = BaseColors & {
  default: ColorScale
  primary: ColorScale
  secondary: ColorScale
  success: ColorScale
  warning: ColorScale
  danger: ColorScale
}

export interface SemanticBaseColors {
  light: BaseColors
  dark: BaseColors
}
