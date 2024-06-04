import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import { button } from '@ciaoui/theme'

import Button from '../src/button.vue'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'],
    },
    disabled: {
      control: 'boolean',
    },
    disableAnimation: {
      control: 'boolean',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    rippled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
  args: {
    onClick: action('onClick'),
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps: InstanceType<typeof Button>['$props'] = {
  ...button.defaultVariants,
  rippled: true,
  loading: false,
}

export const Default: Story = {
  args: {
    ...defaultProps,
  },
}

export const Disabled: Story = {
  args: {
    ...defaultProps,
    disabled: true,
  },
}

export const DisableRippled: Story = {
  args: {
    ...defaultProps,
    rippled: false,
  },
}

export const DisableAnimation: Story = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
}

export const Loading: Story = {
  args: {
    ...defaultProps,
    loading: true,
  },
}

export const UseSlotToSetTitle: Story = {
  args: {
    ...defaultProps,
    default: 'Hello, I\'m a button',
  },
}

export const CustomStyle: Story = {
  args: {
    ...defaultProps,
    radius: 'full',
    class: 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg',
  },
}
