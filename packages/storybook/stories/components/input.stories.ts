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
      options: ['inside', 'outside', 'outside-left'],
    },
    labelAlwaysFloat: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    errorMessage: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps: InstanceType<typeof Input>['$props'] & { readonly: boolean } = {
  ...input.defaultVariants,
  readonly: false,
}

export const Default: Story = {
  args: {
    label: 'Username',
    ...defaultProps,
  },
}

export const Required: Story = {
  args: {
    ...defaultProps,
    label: 'Email',
    required: true,
    modelValue: '2H1hA@example.com',
  },
}

export const Disabled: Story = {
  args: {
    ...defaultProps,
    disabled: true,
    variant: 'faded',
    label: 'Email',
    modelValue: '2H1hA@example.com',
  },
}

export const WithoutLabel: Story = {
  args: {
    label: '',
    placeholder: 'Enter your username',
  },
}

export const DisableAnimation: Story = {
  args: {
    ...defaultProps,
    disableAnimation: true,
    label: 'Email',
  },
}

export const Clearable: Story = {
  args: {
    ...defaultProps,
    clearable: true,
    label: 'Email',
    modelValue: '2H1hA@example.com',
    variant: 'bordered',
  },
}

export const Password: Story = {
  args: {
    ...defaultProps,
    password: true,
    label: 'Password',
    placeholder: 'Enter your password',
    variant: 'bordered',
    color: 'primary',
  },
}

export const Invalid: Story = {
  args: {
    ...defaultProps,
    invalid: true,
    label: 'Email',
    modelValue: '2H1hA@example.com',
    errorMessage: 'Please enter a valid email address',
    variant: 'bordered',
  },
}

export const Suffix: Story = {
  args: {
    ...defaultProps,
    label: 'Price',
    labelPlacement: 'outside',
    variant: 'bordered',
    suffix: '$',
    modelValue: '0.00',
  },
}
