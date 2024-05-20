import type { Meta, StoryObj } from '@storybook/vue3'
import { button } from '@ciao/theme'
import { Button } from '@ciao/uikit'

const meta = {
  title: 'Components/Button',
  component: Button,
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
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps = {
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
