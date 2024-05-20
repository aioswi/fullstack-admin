import type { Meta, StoryObj } from '@storybook/vue3'
import { spinner } from '@ciao/theme'
import { Spinner } from '@ciao/uikit'

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
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    label: {
      control: 'text',
    },
    labelColor: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
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
