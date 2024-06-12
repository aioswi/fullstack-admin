import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { modal } from '@ciaoui/theme'

import Button from '../../button/src/button.vue'
import Modal from '../src/modal.vue'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autotags'],
  argTypes: {},
  decorators: [
    () => {
      return {
        template: '<div class="flex justify-center items-center w-screen h-screen"><story /></div>',
      }
    },
  ],
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps: InstanceType<typeof Modal>['$props'] = {
  ...modal.defaultVariants,
}

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  render(args) {
    return {
      setup() {
        const open = ref(false)

        return () => (
          <div>
            <Button onClick={() => (open.value = true)}>Open Modal</Button>
            <Modal v-model={open.value} {...args}></Modal>
          </div>
        )
      },
    }
  },
}
