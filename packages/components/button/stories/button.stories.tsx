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

export const IconButton: Story = {
  args: {
    ...defaultProps,
    onlyIcon: true,
  },
  render(args) {
    return {
      name: 'Button',
      setup() {
        return () => (
          <Button {...args}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
          </Button>
        )
      },
    }
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
