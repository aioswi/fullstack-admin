import type { VariantProps } from 'tailwind-variants'

import { tv } from '../utils/tv'

const spinner = tv({
  slots: {
    base: 'relative inline-flex flex-col items-center justify-center gap-2',
    wrapper: 'relative animate-spinner-rotate',
    ring: 'animate-spinner-dash',
    label: 'text-foreground dark:text-foreground-dark font-regular',
  },
  variants: {
    size: {
      sm: {
        wrapper: 'w-6 h-6',
        ring: 'stroke-2',
        label: 'text-small',
      },
      md: {
        wrapper: 'w-8 h-8',
        ring: 'stroke-2',
        label: 'text-medium',
      },
      lg: {
        wrapper: 'w-10 h-10',
        ring: 'stroke-3',
        label: 'text-large',
      },
    },
    color: {
      current: {
        ring: 'stroke-current',
      },
      default: {
        ring: 'stroke-default',
      },
      primary: {
        ring: 'stroke-primary',
      },
      secondary: {
        ring: 'stroke-secondary',
      },
      success: {
        ring: 'stroke-success',
      },
      warning: {
        ring: 'stroke-warning',
      },
      danger: {
        ring: 'stroke-danger',
      },
    },
    labelColor: {
      foreground: {
        label: 'text-foreground',
      },
      primary: {
        label: 'text-primary',
      },
      secondary: {
        label: 'text-secondary',
      },
      success: {
        label: 'text-success',
      },
      warning: {
        label: 'text-warning',
      },
      danger: {
        label: 'text-danger',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    labelColor: 'primary',
  },
})

export type SpinnerVariantProps = VariantProps<typeof spinner>

export { spinner }
