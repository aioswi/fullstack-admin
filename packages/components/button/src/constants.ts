import type { InjectionKey } from 'vue'
import type { ButtonColors, ButtonRadius, ButtonSizes, ButtonVariants } from './button'

export interface ButtonGroupContext {
  color?: ButtonColors
  size?: ButtonSizes
  variant?: ButtonVariants
  radius?: ButtonRadius
  disabled?: boolean
  disableAnimation?: boolean
  rippled?: boolean
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol('buttonGroupContextKey')
