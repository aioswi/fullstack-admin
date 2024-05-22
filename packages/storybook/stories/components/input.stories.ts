import type { Meta, StoryObj } from '@storybook/vue3'
import { input } from '@ciao/theme'
import { Input } from '@ciao/uikit'

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['flat', 'faded', 'bordered', 'underlined'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    labelPlacement: {
      control: {
        type: 'select',
      },
      options: ['inside', 'outside', 'outside-left', 'multiline'],
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps: InstanceType<typeof Input>['$props'] = {
  ...input.defaultVariants,
}

export const Default: Story = {
  args: {
    label: 'Username',
    ...defaultProps,
  },
}

export const Disabled: Story = {
  args: {
    ...defaultProps,
    disabled: true,
  },
}

export const DisableAnimation: Story = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
}
