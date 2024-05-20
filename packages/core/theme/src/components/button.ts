import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'
import { collapseAdjacentVariantBorders, colorVariants, dataFocusVisibleClasses } from '../utils'

const button = tv({
  base: [
    'z-0',
    'group',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'box-border',
    'appearance-none',
    'outline-none',
    'select-none',
    'whitespace-nowrap',
    'min-w-max',
    'font-normal',
    'subpixel-antialiased',
    'overflow-hidden',
    'tap-highlight-transparent',
    // focus ring
    ...dataFocusVisibleClasses,
  ],
  variants: {
    variant: {
      solid: '',
      bordered: 'border-medium bg-transparent',
      light: 'bg-transparent',
      flat: '',
      faded: 'border-medium',
      shadow: '',
      ghost: 'border-medium bg-transparent',
    },
    size: {
      sm: 'px-3 min-w-16 h-8 text-tiny gap-2 rounded-small',
      md: 'px-4 min-w-20 h-10 text-small gap-2 rounded-medium',
      lg: 'px-6 min-w-24 h-12 text-medium gap-3 rounded-large',
    },
    color: {
      default: '',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
      danger: '',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-small',
      md: 'rounded-medium',
      lg: 'rounded-large',
      full: 'rounded-full',
    },
    disabled: {
      true: 'opacity-disabled pointer-events-none',
    },
    disableAnimation: {
      true: '!transition-none',
      false:
        'data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'default',
    radius: 'md',
    disabled: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: 'solid',
      color: 'default',
      class: colorVariants.solid.default,
    },
    {
      variant: 'solid',
      color: 'primary',
      class: colorVariants.solid.primary,
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: colorVariants.solid.secondary,
    },
    {
      variant: 'solid',
      color: 'success',
      class: colorVariants.solid.success,
    },
    {
      variant: 'solid',
      color: 'warning',
      class: colorVariants.solid.warning,
    },
    {
      variant: 'solid',
      color: 'danger',
      class: colorVariants.solid.danger,
    },
    // shadow / color
    {
      variant: 'shadow',
      color: 'default',
      class: colorVariants.shadow.default,
    },
    {
      variant: 'shadow',
      color: 'primary',
      class: colorVariants.shadow.primary,
    },
    {
      variant: 'shadow',
      color: 'secondary',
      class: colorVariants.shadow.secondary,
    },
    {
      variant: 'shadow',
      color: 'success',
      class: colorVariants.shadow.success,
    },
    {
      variant: 'shadow',
      color: 'warning',
      class: colorVariants.shadow.warning,
    },
    {
      variant: 'shadow',
      color: 'danger',
      class: colorVariants.shadow.danger,
    },
    // bordered / color
    {
      variant: 'bordered',
      color: 'default',
      class: colorVariants.bordered.default,
    },
    {
      variant: 'bordered',
      color: 'primary',
      class: colorVariants.bordered.primary,
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: colorVariants.bordered.secondary,
    },
    {
      variant: 'bordered',
      color: 'success',
      class: colorVariants.bordered.success,
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: colorVariants.bordered.warning,
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: colorVariants.bordered.danger,
    },
    // flat / color
    {
      variant: 'flat',
      color: 'default',
      class: colorVariants.flat.default,
    },
    {
      variant: 'flat',
      color: 'primary',
      class: colorVariants.flat.primary,
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: colorVariants.flat.secondary,
    },
    {
      variant: 'flat',
      color: 'success',
      class: colorVariants.flat.success,
    },
    {
      variant: 'flat',
      color: 'warning',
      class: colorVariants.flat.warning,
    },
    {
      variant: 'flat',
      color: 'danger',
      class: colorVariants.flat.danger,
    },
    // faded / color
    {
      variant: 'faded',
      color: 'default',
      class: colorVariants.faded.default,
    },
    {
      variant: 'faded',
      color: 'primary',
      class: colorVariants.faded.primary,
    },
    {
      variant: 'faded',
      color: 'secondary',
      class: colorVariants.faded.secondary,
    },
    {
      variant: 'faded',
      color: 'success',
      class: colorVariants.faded.success,
    },
    {
      variant: 'faded',
      color: 'warning',
      class: colorVariants.faded.warning,
    },
    {
      variant: 'faded',
      color: 'danger',
      class: colorVariants.faded.danger,
    },
    // light / color
    {
      variant: 'light',
      color: 'default',
      class: [colorVariants.light.default, 'data-[hover=true]:bg-default/40'],
    },
    {
      variant: 'light',
      color: 'primary',
      class: [colorVariants.light.primary, 'data-[hover=true]:bg-primary/20'],
    },
    {
      variant: 'light',
      color: 'secondary',
      class: [colorVariants.light.secondary, 'data-[hover=true]:bg-secondary/20'],
    },
    {
      variant: 'light',
      color: 'success',
      class: [colorVariants.light.success, 'data-[hover=true]:bg-success/20'],
    },
    {
      variant: 'light',
      color: 'warning',
      class: [colorVariants.light.warning, 'data-[hover=true]:bg-warning/20'],
    },
    {
      variant: 'light',
      color: 'danger',
      class: [colorVariants.light.danger, 'data-[hover=true]:bg-danger/20'],
    },
    // ghost / color
    {
      variant: 'ghost',
      color: 'default',
      class: colorVariants.ghost.default,
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: colorVariants.ghost.primary,
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: colorVariants.ghost.secondary,
    },
    {
      variant: 'ghost',
      color: 'success',
      class: colorVariants.ghost.success,
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: colorVariants.ghost.warning,
    },
    {
      variant: 'ghost',
      color: 'danger',
      class: colorVariants.ghost.danger,
    },
    // isInGroup / radius / size <-- radius not provided
    {
      isInGroup: true,
      class: 'rounded-none first:rounded-s-medium last:rounded-e-medium',
    },
    {
      isInGroup: true,
      size: 'sm',
      class: 'rounded-none first:rounded-s-small last:rounded-e-small',
    },
    {
      isInGroup: true,
      size: 'md',
      class: 'rounded-none first:rounded-s-medium last:rounded-e-medium',
    },
    {
      isInGroup: true,
      size: 'lg',
      class: 'rounded-none first:rounded-s-large last:rounded-e-large',
    },
    {
      isInGroup: true,
      isRounded: true,
      class: 'rounded-none first:rounded-s-full last:rounded-e-full',
    },
    // isInGroup / radius <-- radius provided
    {
      isInGroup: true,
      radius: 'none',
      class: 'rounded-none first:rounded-s-none last:rounded-e-none',
    },
    {
      isInGroup: true,
      radius: 'sm',
      class: 'rounded-none first:rounded-s-small last:rounded-e-small',
    },
    {
      isInGroup: true,
      radius: 'md',
      class: 'rounded-none first:rounded-s-medium last:rounded-e-medium',
    },
    {
      isInGroup: true,
      radius: 'lg',
      class: 'rounded-none first:rounded-s-large last:rounded-e-large',
    },
    {
      isInGroup: true,
      radius: 'full',
      class: 'rounded-none first:rounded-s-full last:rounded-e-full',
    },
    // variant / hover
    {
      variant: ['solid', 'faded', 'flat', 'bordered', 'shadow'],
      class: 'data-[hover=true]:opacity-hover',
    },
  ],
})

export type ButtonVariantProps = VariantProps<typeof button>

export { button }