import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import Button from '../src/button.vue'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    // backgroundColor: { control: 'color' },
  },
  args: {
    primary: false,
    size: 'medium',
    default: 'Button',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
  },
  render: args => ({
    components: { Button },
    setup() {
      // const click = action('click')
      return { args }
    },
    template: /* html */`
      <Button v-bind="args">
        {{ args.default }}
      </Button>
    `,
  }),
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  },
}

export const Secondary: Story = {
  args: {
    primary: false,
  },
}
