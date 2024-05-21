import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'

const spinner = tv({
  slots: {
    base: 'relative inline-flex flex-col items-center justify-center gap-2',
    wrapper: 'relative animate-spinner-rotate',
    ring: 'animate-spinner-dash stroke-4',
    label: 'text-foreground dark:text-foreground-dark font-regular',
  },
  variants: {
    size: {
      sm: {
        wrapper: 'w-5 h-5',
        label: 'text-small',
      },
      md: {
        wrapper: 'w-7 h-7',
        label: 'text-medium',
      },
      lg: {
        wrapper: 'w-10 h-10',
        label: 'text-large',
      },
    },
    color: {
      current: {
        ring: 'stroke-current',
        label: 'text-current',
      },
      default: {
        ring: 'stroke-default',
        label: 'text-default',
      },
      primary: {
        ring: 'stroke-primary',
        label: 'text-primary',
      },
      secondary: {
        ring: 'stroke-secondary',
        label: 'text-secondary',
      },
      success: {
        ring: 'stroke-success',
        label: 'text-success',
      },
      warning: {
        ring: 'stroke-warning',
        label: 'text-warning',
      },
      danger: {
        ring: 'stroke-danger',
        label: 'text-danger',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

export type SpinnerVariantProps = VariantProps<typeof spinner>
export type SpinnerSlots = keyof ReturnType<typeof spinner>

export { spinner }
