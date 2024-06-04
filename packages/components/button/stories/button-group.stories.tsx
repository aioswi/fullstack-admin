import type { Meta, StoryObj } from '@storybook/vue3'

import { button, buttonGroup } from '@ciaoui/theme'
import ButtonGroup from '../src/button-group.vue'
import Button from '../src/button.vue'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['!autodocs'],
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
  },
} satisfies Meta<typeof ButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps: InstanceType<typeof ButtonGroup>['$props'] = {
  ...button.defaultVariants,
  ...buttonGroup.defaultVariants,
}

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  render(args) {
    return {
      name: 'ButtonGroup',
      setup() {
        return () => (
          <ButtonGroup {...args}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        )
      },
    }
  },
}
