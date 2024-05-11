import type { Meta, StoryObj } from '@storybook/vue3'
import { commonColors } from '../src/colors'
import ColorPlate from './ColorPlate.vue'

const meta = {
  title: 'Foundations/Colors',
  component: ColorPlate,
  argTypes: {
    isSemantic: {
      control: false,
    },
  },
} as Meta<typeof ColorPlate>

export default meta

type Story = StoryObj<typeof meta>

function getCommonItems(colors: string[]) {
  return colors.map(color => ({ color }))
}

export const CommonColors: Story = {
  args: {
    colors: [
      {
        title: 'App Colors',
        items: getCommonItems([commonColors.white, commonColors.black]),
      },
      {
        title: 'Blue',
        items: getCommonItems([...Object.values(commonColors.blue)]),
      },
      {
        title: 'Purple',
        items: getCommonItems([...Object.values(commonColors.purple)]),
      },
      {
        title: 'Green',
        items: getCommonItems([...Object.values(commonColors.green)]),
      },
      {
        title: 'Red',
        items: getCommonItems([...Object.values(commonColors.red)]),
      },
      {
        title: 'Pink',
        items: getCommonItems([...Object.values(commonColors.pink)]),
      },
      {
        title: 'Yellow',
        items: getCommonItems([...Object.values(commonColors.yellow)]),
      },
      {
        title: 'Cyan',
        items: getCommonItems([...Object.values(commonColors.cyan)]),
      },
    ],
  },
}

export const SemanticColors: Story = {
  args: {
    isSemantic: true,
    colors: [
      {
        title: 'Layout',
        items: [
          {
            color: 'background',
            className: 'bg-background',
            textClassName: 'text-foreground',
          },
          {
            color: 'foreground',
            className: 'bg-foreground',
            textClassName: 'text-background',
          },
          {
            color: 'divider',
            className: 'bg-divider',
            textClassName: 'text-foreground',
          },
          {
            color: 'focus',
            className: 'bg-focus',
            textClassName: 'text-primary-foreground',
          },
        ],
      },
      {
        title: 'Content',
        items: [
          {
            color: 'title',
            className: 'bg-title',
            textClassName: 'text-title-foreground',
          },
          {
            color: 'subtitle',
            className: 'bg-subtitle',
            textClassName: 'text-subtitle-foreground',
          },
          {
            color: 'content',
            className: 'bg-content',
            textClassName: 'text-content-foreground',
          },
          {
            color: 'description',
            className: 'bg-description',
            textClassName: 'text-description-foreground',
          },
        ],
      },
      {
        title: 'Base',
        items: [
          {
            color: 'default',
            className: 'bg-default',
            textClassName: 'text-default-foreground',
          },
          {
            color: 'primary',
            className: 'bg-primary',
            textClassName: 'text-primary-foreground',
          },
          {
            color: 'secondary',
            className: 'bg-secondary',
            textClassName: 'text-secondary-foreground',
          },
          {
            color: 'success',
            className: 'bg-success',
            textClassName: 'text-success-foreground',
          },
          {
            color: 'warning',
            className: 'bg-warning',
            textClassName: 'text-warning-foreground',
          },
          {
            color: 'danger',
            className: 'bg-danger',
            textClassName: 'text-danger-foreground',
          },
        ],
      },
      {
        title: 'Default',
        items: [
          {
            color: '50',
            className: 'bg-default-50',
            textClassName: 'text-default-900',
          },
          {
            color: '100',
            className: 'bg-default-100',
            textClassName: 'text-default-900',
          },
          {
            color: '200',
            className: 'bg-default-200',
            textClassName: 'text-default-800',
          },
          {
            color: '300',
            className: 'bg-default-300',
            textClassName: 'text-default-800',
          },
          {
            color: '400',
            className: 'bg-default-400',
            textClassName: 'text-default-800',
          },
          {
            color: '500',
            className: 'bg-default-500',
            textClassName: 'text-default-foreground',
          },
          {
            color: '600',
            className: 'bg-default-600',
            textClassName: 'text-default-50',
          },
          {
            color: '700',
            className: 'bg-default-700',
            textClassName: 'text-default-100',
          },
          {
            color: '800',
            className: 'bg-default-800',
            textClassName: 'text-default-100',
          },
          {
            color: '900',
            className: 'bg-default-900',
            textClassName: 'text-default-100',
          },
        ],
      },
      {
        title: 'Primary',
        items: [
          {
            color: '50',
            className: 'bg-primary-50',
            textClassName: 'text-primary-900',
          },
          {
            color: '100',
            className: 'bg-primary-100',
            textClassName: 'text-primary-900',
          },
          {
            color: '200',
            className: 'bg-primary-200',
            textClassName: 'text-primary-800',
          },
          {
            color: '300',
            className: 'bg-primary-300',
            textClassName: 'text-primary-800',
          },
          {
            color: '400',
            className: 'bg-primary-400',
            textClassName: 'text-primary-800',
          },
          {
            color: '500',
            className: 'bg-primary-500',
            textClassName: 'text-primary-foreground',
          },
          {
            color: '600',
            className: 'bg-primary-600',
            textClassName: 'text-primary-50',
          },
          {
            color: '700',
            className: 'bg-primary-700',
            textClassName: 'text-primary-100',
          },
          {
            color: '800',
            className: 'bg-primary-800',
            textClassName: 'text-primary-100',
          },
          {
            color: '900',
            className: 'bg-primary-900',
            textClassName: 'text-primary-100',
          },
        ],
      },
      {
        title: 'Secondary',
        items: [
          {
            color: '50',
            className: 'bg-secondary-50',
            textClassName: 'text-secondary-900',
          },
          {
            color: '100',
            className: 'bg-secondary-100',
            textClassName: 'text-secondary-900',
          },
          {
            color: '200',
            className: 'bg-secondary-200',
            textClassName: 'text-secondary-800',
          },
          {
            color: '300',
            className: 'bg-secondary-300',
            textClassName: 'text-secondary-800',
          },
          {
            color: '400',
            className: 'bg-secondary-400',
            textClassName: 'text-secondary-800',
          },
          {
            color: '500',
            className: 'bg-secondary-500',
            textClassName: 'text-secondary-foreground',
          },
          {
            color: '600',
            className: 'bg-secondary-600',
            textClassName: 'text-secondary-50',
          },
          {
            color: '700',
            className: 'bg-secondary-700',
            textClassName: 'text-secondary-100',
          },
          {
            color: '800',
            className: 'bg-secondary-800',
            textClassName: 'text-secondary-100',
          },
          {
            color: '900',
            className: 'bg-secondary-900',
            textClassName: 'text-secondary-100',
          },
        ],
      },
      {
        title: 'Success',
        items: [
          {
            color: '50',
            className: 'bg-success-50',
            textClassName: 'text-success-900',
          },
          {
            color: '100',
            className: 'bg-success-100',
            textClassName: 'text-success-900',
          },
          {
            color: '200',
            className: 'bg-success-200',
            textClassName: 'text-success-800',
          },
          {
            color: '300',
            className: 'bg-success-300',
            textClassName: 'text-success-800',
          },
          {
            color: '400',
            className: 'bg-success-400',
            textClassName: 'text-success-800',
          },
          {
            color: '500',
            className: 'bg-success-500',
            textClassName: 'text-success-foreground',
          },
          {
            color: '600',
            className: 'bg-success-600',
            textClassName: 'text-success-50',
          },
          {
            color: '700',
            className: 'bg-success-700',
            textClassName: 'text-success-100',
          },
          {
            color: '800',
            className: 'bg-success-800',
            textClassName: 'text-success-100',
          },
          {
            color: '900',
            className: 'bg-success-900',
            textClassName: 'text-success-100',
          },
        ],
      },
      {
        title: 'Warning',
        items: [
          {
            color: '50',
            className: 'bg-warning-50',
            textClassName: 'text-warning-900',
          },
          {
            color: '100',
            className: 'bg-warning-100',
            textClassName: 'text-warning-900',
          },
          {
            color: '200',
            className: 'bg-warning-200',
            textClassName: 'text-warning-800',
          },
          {
            color: '300',
            className: 'bg-warning-300',
            textClassName: 'text-warning-800',
          },
          {
            color: '400',
            className: 'bg-warning-400',
            textClassName: 'text-warning-800',
          },
          {
            color: '500',
            className: 'bg-warning-500',
            textClassName: 'text-warning-foreground',
          },
          {
            color: '600',
            className: 'bg-warning-600',
            textClassName: 'text-warning-50',
          },
          {
            color: '700',
            className: 'bg-warning-700',
            textClassName: 'text-warning-100',
          },
          {
            color: '800',
            className: 'bg-warning-800',
            textClassName: 'text-warning-100',
          },
          {
            color: '900',
            className: 'bg-warning-900',
            textClassName: 'text-warning-100',
          },
        ],
      },
      {
        title: 'Danger',
        items: [
          {
            color: '50',
            className: 'bg-danger-50',
            textClassName: 'text-danger-900',
          },
          {
            color: '100',
            className: 'bg-danger-100',
            textClassName: 'text-danger-900',
          },
          {
            color: '200',
            className: 'bg-danger-200',
            textClassName: 'text-danger-800',
          },
          {
            color: '300',
            className: 'bg-danger-300',
            textClassName: 'text-danger-800',
          },
          {
            color: '400',
            className: 'bg-danger-400',
            textClassName: 'text-danger-800',
          },
          {
            color: '500',
            className: 'bg-danger-500',
            textClassName: 'text-danger-foreground',
          },
          {
            color: '600',
            className: 'bg-danger-600',
            textClassName: 'text-danger-50',
          },
          {
            color: '700',
            className: 'bg-danger-700',
            textClassName: 'text-danger-100',
          },
          {
            color: '800',
            className: 'bg-danger-800',
            textClassName: 'text-danger-100',
          },
          {
            color: '900',
            className: 'bg-danger-900',
            textClassName: 'text-danger-100',
          },
        ],
      },
    ],
  },
}
