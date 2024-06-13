import type { Meta, StoryObj } from '@storybook/vue3'
import { input } from '@ciaoui/theme'

import Input from '../src/input.vue'

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
  decorators: [
    () => {
      return {
        template: '<div class="w-full flex justify-center"><story /></div>',
      }
    },
  ],
} satisfies Meta<typeof Input>

function NormalTemplate(args: any) {
  return {
    components: { Input },
    setup() {
      return { args }
    },
    template: '<div class="w-full max-w-lg"><Input v-bind="args" /></div>',
  }
}

export default meta

type Story = StoryObj<typeof meta>

const defaultProps: InstanceType<typeof Input>['$props'] & { readonly: boolean } = {
  ...input.defaultVariants,
  readonly: false,
}

export const Default: Story = {
  render: NormalTemplate,
  args: {
    ...defaultProps,
  },
}

export const LabelPlacement: Story = {
  args: {
    ...defaultProps,
    label: 'Email',
  },
  render(args) {
    return {
      setup() {
        return () => (
          <div class="w-full flex flex-col items-center gap-12">
            <div class="flex flex-col gap-4">
              <h3>Without placeholder</h3>
              <div class="w-full max-w-3xl grid grid-cols-3 items-end gap-4">
                <div class="flex flex-col gap-2">
                  <Input {...args} labelPlacement="inside"></Input>
                  <span class="text-default-400 text-sm">inside</span>
                </div>
                <div class="flex flex-col gap-2">
                  <Input {...args} labelPlacement="outside"></Input>
                  <span class="text-default-400 text-sm">outside</span>
                </div>
                <div class="flex flex-col gap-2">
                  <Input {...args} labelPlacement="outside-left"></Input>
                  <span class="text-default-400 text-sm">outside-left</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <h3>With placeholder</h3>
              <div class="w-full max-w-3xl grid grid-cols-3 items-end gap-4">
                <div class="flex flex-col gap-2">
                  <Input {...args} labelPlacement="inside" placeholder="Please enter your email"></Input>
                  <span class="text-default-400 text-sm">inside</span>
                </div>
                <div class="flex flex-col gap-2">
                  <Input {...args} color={args.color} labelPlacement="outside" placeholder="Please enter your email"></Input>
                  <span class="text-default-400 text-sm">outside</span>
                </div>
                <div class="flex flex-col gap-2">
                  <Input {...args} labelPlacement="outside-left" placeholder="Please enter your email"></Input>
                  <span class="text-default-400 text-sm">outside-left</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
    }
  },
}

export const Required: Story = {
  render: NormalTemplate,
  args: {
    ...defaultProps,
    label: 'Email',
    required: true,
    modelValue: '2H1hA@example.com',
  },
}

export const Disabled: Story = {
  render: NormalTemplate,
  args: {
    ...defaultProps,
    disabled: true,
    variant: 'faded',
    label: 'Email',
    modelValue: '2H1hA@example.com',
  },
}

export const WithoutLabel: Story = {
  render: NormalTemplate,
  args: {
    label: '',
    placeholder: 'Enter your username',
  },
}

export const AutoFocus: Story = {
  render: NormalTemplate,
  args: {
    ...defaultProps,
    autoFocus: true,
    label: 'Email',
    modelValue: '2H1hA@example.com',
    variant: 'bordered',
  },
}

export const DisableAnimation: Story = {
  render: NormalTemplate,
  args: {
    ...defaultProps,
    disableAnimation: true,
    label: 'Email',
  },
}

export const Clearable: Story = {
  render: NormalTemplate,
  args: {
    ...defaultProps,
    clearable: true,
    label: 'Email',
    modelValue: '2H1hA@example.com',
    variant: 'bordered',
  },
}

export const Password: Story = {
  render: NormalTemplate,
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
  render: NormalTemplate,
  args: {
    ...defaultProps,
    invalid: true,
    label: 'Username',
    modelValue: 'ciao',
    variant: 'bordered',
  },
}

export const Validation: Story = {
  render: NormalTemplate,
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
  render: NormalTemplate,
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
    placeholder: 'github.com',
  },
  render(args) {
    return {
      name: 'Input',
      setup() {
        return () => (
          <div>
            <Input {...args}>
              {{
                prefix: () => (<span class="text-default-400 text-sm">https://</span>),
              }}
            </Input>
          </div>
        )
      },
    }
  },
}

export const Suffix: Story = {
  args: {
    ...defaultProps,
    label: 'Length',
    labelPlacement: 'outside',
    variant: 'bordered',
    modelValue: '10.00',
  },
  render(args) {
    return {
      name: 'Input',
      setup() {
        return () => (
          <div>
            <Input {...args}>
              {{
                suffix: () => (<span class="text-default-400 text-sm">cm</span>),
              }}
            </Input>
          </div>
        )
      },
    }
  },
}

export const PrefixAndSuffix: Story = {
  args: {
    ...defaultProps,
    label: 'Website',
    labelPlacement: 'inside',
    variant: 'bordered',
    modelValue: 'github',
  },
  render(args) {
    return {
      name: 'Input',
      setup() {
        return () => (
          <div>
            <Input {...args}>
              {{
                prefix: () => (<span class="text-default-400 text-sm">https://</span>),
                suffix: () => (<span class="text-default-400 text-sm">.com</span>),
              }}
            </Input>
          </div>
        )
      },
    }
  },
}

export const LimitWordLength: Story = {
  render: NormalTemplate,
  args: {
    ...defaultProps,
    label: 'Password',
    labelPlacement: 'inside',
    variant: 'bordered',
    password: true,
    showWordLimit: true,
    minlength: 6,
    maxlength: 20,
  },
}
