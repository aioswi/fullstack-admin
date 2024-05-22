import type { InputVariantProps } from '@ciao/theme'

export type InputVariants = InputVariantProps['variant']

export type InputRadius = InputVariantProps['radius']

export type InputSizes = InputVariantProps['size']

export type InputColors = InputVariantProps['color']

const InputLabelPlacement = ['inside', 'outside', 'outside-left', 'multiline'] as const

export type InputLabelPlacements = typeof InputLabelPlacement[number]
