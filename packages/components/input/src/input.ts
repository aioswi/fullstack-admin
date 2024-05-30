import type { InputVariantProps } from '@ciaoui/theme'

export type InputVariants = InputVariantProps['variant']

export type InputRadius = InputVariantProps['radius']

export type InputSizes = InputVariantProps['size']

export type InputColors = InputVariantProps['color']

const InputLabelPlacement = ['inside', 'outside', 'outside-left'] as const

export type InputLabelPlacements = typeof InputLabelPlacement[number]
