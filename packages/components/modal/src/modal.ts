import type { ModalVariantProps } from '@ciaoui/theme'

export type ModalSizes = ModalVariantProps['size']

export type ModalRadius = ModalVariantProps['radius']

export type ModalPlacements = ModalVariantProps['placement']

export type ModalShadows = ModalVariantProps['shadow']

export type ModalBackdrops = ModalVariantProps['backdrop']

export type ModalScrollBehavior = ModalVariantProps['scrollBehavior']

export const DismissBehavior = ['click', 'escape', 'all', 'none'] as const

export type ModalDismissBehavior = typeof DismissBehavior[number]
