import type { Meta, StoryObj } from '@storybook/vue3'
import { input } from '@ciaoui/theme'
import { Input } from '@ciaoui/uikit'
import { h } from 'vue'

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
    clearable: {
      control: 'boolean',
    },
    validation: {
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
    label: 'Username',
    modelValue: 'ciao',
    variant: 'bordered',
  },
}

export const Validation: Story = {
  args: {
    ...defaultProps,
    label: 'Username',
    required: true,
    variant: 'bordered',
    placeholder: 'Please enter a valid username.',
    modelValue: 'john.doe',
    validation: 'Username is required.',
  },
}

export const ValidationWithFunction: Story = {
  args: {
    ...defaultProps,
    label: 'Email',
    required: true,
    variant: 'bordered',
    placeholder: 'Please enter a valid email address.',
    modelValue: '2H1hA@example.com',
    validation: (value: string) => {
      if (!value)
        return 'Email is required.'
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i
      if (!regex.test(value))
        return 'Please enter a valid email address.'
      return ''
    },
  },
}

export const Prefix: Story = {
  args: {
    ...defaultProps,
    label: 'Github',
    labelPlacement: 'outside',
    variant: 'bordered',
    prefix: h('span', { class: 'text-default-400 text-sm' }, 'https://'),
    placeholder: 'github.com',
  },
}

export const Suffix: Story = {
  args: {
    ...defaultProps,
    label: 'Price',
    labelPlacement: 'outside',
    variant: 'bordered',
    suffix: h('span', { class: 'text-default-400 text-sm' }, '$'),
    modelValue: '0.00',
  },
}

export const PrefixAndSuffix: Story = {
  args: {
    ...defaultProps,
    label: 'Website',
    labelPlacement: 'inside',
    variant: 'bordered',
    prefix: h('span', { class: 'text-default-400 text-sm' }, 'https://'),
    suffix: h('span', { class: 'text-default-400 text-sm' }, '.com'),
    modelValue: 'github',
  },
}

// export const UseVModel: Story = {
//   name: 'Use v-model',
//   // render: UseVModelTemplate,
//   args: {
//     ...defaultProps,
//     label: 'Email',
//     placeholder: 'Enter your email',
//   },
// }
