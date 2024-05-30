import type { Meta, StoryObj } from '@storybook/vue3'
import { spinner } from '@ciaoui/theme'
import { Spinner } from '@ciaoui/uikit'
import { h } from 'vue'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['current', 'default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps = {
  ...spinner.defaultVariants,
}

export const Default: Story = {
  args: {
    ...defaultProps,
  },
}

export const WithLabel: Story = {
  args: {
    ...defaultProps,
    label: 'Loading...',
  },
}

export const CustomLabel: Story = {
  args: {
    ...defaultProps,
    default: h('span', { class: 'text-pink-500 italic text-2xl' }, 'I\'m loading'),
  },
}
