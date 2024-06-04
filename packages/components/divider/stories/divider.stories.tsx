import type { Meta, StoryObj } from '@storybook/vue3'
import { divider } from '@ciaoui/theme'

import Divider from '../src/divider.vue'

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['!autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  decorators: [
    () => {
      return {
        template: '<div class="w-full flex justify-center my-12"><story /></div>',
      }
    },
  ],
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps: InstanceType<typeof Divider>['$props'] = {
  ...divider.defaultVariants,
}

export const Default: Story = {
  render() {
    return {
      setup() {
        return () => (
          <div class="max-w-md w-full">
            <div class="space-y-1">
              <h3 class="text-base font-medium">CiaoUI</h3>
              <p class="text-sm text-default-400">NextUI components in Vue3</p>
            </div>
            <Divider class="my-4" />
            <div class="flex h-5 items-center space-x-4 rtl:space-x-reverse text-sm">
              <div>Docs</div>
              <Divider orientation="vertical" />
              <div>Components</div>
              <Divider orientation="vertical" />
              <div>Blog</div>
            </div>
          </div>
        )
      },
    }
  },
  args: {
    ...defaultProps,
  },
}
