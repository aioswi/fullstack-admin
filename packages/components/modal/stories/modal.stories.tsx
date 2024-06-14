import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { modal } from '@ciaoui/theme'

import Input from '../../input/src/input.vue'
import Button from '../../button/src/button.vue'
import Modal from '../src/modal.vue'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autotags'],
  argTypes: {
    title: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    placement: {
      control: 'select',
      options: ['auto', 'center', 'top', 'top-center', 'bottom', 'bottom-center'],
    },
    shadow: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    backdrop: {
      control: 'select',
      options: ['transparent', 'opaque', 'blur'],
    },
    scrollBehavior: {
      control: 'select',
      options: ['normal', 'inside', 'outside'],
    },
    disableAnimation: {
      control: 'boolean',
    },
    dismissBehavior: {
      control: 'select',
      options: ['all', 'escape', 'click', 'none'],
    },
    lockScroll: {
      control: 'boolean',
    },
  },
  decorators: [
    () => {
      return {
        template: '<div class="flex justify-center items-center w-full h-screen"><story /></div>',
      }
    },
  ],
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

const defaultProps: InstanceType<typeof Modal>['$props'] = {
  ...modal.defaultVariants,
  title: 'Login',
  dismissBehavior: 'all',
  lockScroll: true,
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
            <Modal v-model={open.value} {...args}>
              {{
                body: () => (
                  <>
                    <Input label="Email" variant="bordered" placeholder="Enter your email" autoFocus />
                    <Input label="Password" variant="bordered" placeholder="Enter your password" password />
                  </>
                ),
                actions: () => (
                  <div class="flex items-center gap-x-2">
                    <Button color="danger" variant="flat" onClick={() => (open.value = false)}>
                      Close
                    </Button>
                    <Button disabled color="primary" variant="flat" onClick={() => (open.value = false)}>
                      Login
                    </Button>
                  </div>
                ),
              }}
            </Modal>
          </div>
        )
      },
    }
  },
}

export const InsideScroll: Story = {
  args: {
    ...defaultProps,
    title: 'Modal Title',
    scrollBehavior: 'inside',
  },
  render(args) {
    return {
      setup() {
        const open = ref(false)

        return () => (
          <div>
            <Button onClick={() => (open.value = true)}>Open Modal</Button>
            <Modal v-model={open.value} {...args}>
              {{
                body: () => (
                  <>
                    <p>
                      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                      veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
                      officia tempor esse quis.
                    </p>
                    <p>
                      Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna aute tempor cupidatat
                      consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis
                      sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
                      consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
                      veniam.
                    </p>
                    <p>
                      Est velit labore esse esse cupidatat. Velit id elit consequat minim. Mollit enim excepteur ea
                      laboris adipisicing aliqua proident occaecat do do adipisicing adipisicing ut fugiat. Consequat
                      pariatur ullamco aute sunt esse. Irure excepteur eu non eiusmod. Commodo commodo et ad ipsum elit
                      esse pariatur sit adipisicing sunt excepteur enim.
                    </p>
                    <p>
                      Incididunt duis commodo mollit esse veniam non exercitation dolore occaecat ea nostrud laboris.
                      Adipisicing occaecat fugiat fugiat irure fugiat in magna non consectetur proident fugiat. Commodo
                      magna et aliqua elit sint cupidatat. Sint aute ullamco enim cillum anim ex. Est eiusmod commodo
                      occaecat consequat laboris est do duis. Enim incididunt non culpa velit quis aute in elit magna
                      ullamco in consequat ex proident.
                    </p>
                    <p>
                      Dolore incididunt mollit fugiat pariatur cupidatat ipsum laborum cillum. Commodo consequat velit
                      cupidatat duis ex nisi non aliquip ad ea pariatur do culpa. Eiusmod proident adipisicing tempor
                      tempor qui pariatur voluptate dolor do ea commodo. Veniam voluptate cupidatat ex nisi do ullamco
                      in quis elit.
                    </p>
                    <p>
                      Cillum proident veniam cupidatat pariatur laborum tempor cupidatat anim eiusmod id nostrud
                      pariatur tempor reprehenderit. Do esse ullamco laboris sunt proident est ea exercitation
                      cupidatat. Do Lorem eiusmod aliqua culpa ullamco consectetur veniam voluptate cillum. Dolor
                      consequat cillum tempor laboris mollit laborum reprehenderit reprehenderit veniam aliqua deserunt
                      cupidatat consequat id.
                    </p>
                    <p>
                      Est id tempor excepteur enim labore sint aliquip consequat duis minim tempor proident. Dolor
                      incididunt aliquip minim elit ea. Exercitation non officia eu id.
                    </p>
                    <p>
                      Ipsum ipsum consequat incididunt do aliquip pariatur nostrud. Qui ut sint culpa labore Lorem.
                      Magna deserunt aliquip aute duis consectetur magna amet anim. Magna fugiat est nostrud veniam.
                      Officia duis ea sunt aliqua.
                    </p>
                    <p>
                      Ipsum minim officia aute anim minim aute aliquip aute non in non. Ipsum aliquip proident ut dolore
                      eiusmod ad fugiat fugiat ut ex. Ea velit Lorem ut et commodo nulla voluptate veniam ea et aliqua
                      esse id. Pariatur dolor et adipisicing ea mollit. Ipsum non irure proident ipsum dolore aliquip
                      adipisicing laborum irure dolor nostrud occaecat exercitation.
                    </p>
                    <p>
                      Culpa qui reprehenderit nostrud aliqua reprehenderit et ullamco proident nisi commodo non ut.
                      Ipsum quis irure nisi sint do qui velit nisi. Sunt voluptate eu reprehenderit tempor consequat
                      eiusmod Lorem irure velit duis Lorem laboris ipsum cupidatat. Pariatur excepteur tempor veniam
                      cillum et nulla ipsum veniam ad ipsum ad aute. Est officia duis pariatur ad eiusmod id voluptate.
                    </p>
                  </>
                ),
                actions: () => (
                  <Button variant="solid" onClick={() => (open.value = false)}>
                    Close
                  </Button>
                ),
              }}
            </Modal>
          </div>
        )
      },
    }
  },
}

export const OutsideScroll: Story = {
  args: {
    ...defaultProps,
    title: 'Modal Title',
    scrollBehavior: 'outside',
    lockScroll: false,
  },
  render(args) {
    return {
      setup() {
        const open = ref(false)

        return () => (
          <div>
            <Button onClick={() => (open.value = true)}>Open Modal</Button>
            <Modal v-model={open.value} {...args}>
              {{
                body: () => (
                  <>
                    <p>
                      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                      veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
                      officia tempor esse quis.
                    </p>
                    <p>
                      Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna aute tempor cupidatat
                      consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis
                      sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
                      consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
                      veniam.
                    </p>
                    <p>
                      Est velit labore esse esse cupidatat. Velit id elit consequat minim. Mollit enim excepteur ea
                      laboris adipisicing aliqua proident occaecat do do adipisicing adipisicing ut fugiat. Consequat
                      pariatur ullamco aute sunt esse. Irure excepteur eu non eiusmod. Commodo commodo et ad ipsum elit
                      esse pariatur sit adipisicing sunt excepteur enim.
                    </p>
                    <p>
                      Incididunt duis commodo mollit esse veniam non exercitation dolore occaecat ea nostrud laboris.
                      Adipisicing occaecat fugiat fugiat irure fugiat in magna non consectetur proident fugiat. Commodo
                      magna et aliqua elit sint cupidatat. Sint aute ullamco enim cillum anim ex. Est eiusmod commodo
                      occaecat consequat laboris est do duis. Enim incididunt non culpa velit quis aute in elit magna
                      ullamco in consequat ex proident.
                    </p>
                    <p>
                      Dolore incididunt mollit fugiat pariatur cupidatat ipsum laborum cillum. Commodo consequat velit
                      cupidatat duis ex nisi non aliquip ad ea pariatur do culpa. Eiusmod proident adipisicing tempor
                      tempor qui pariatur voluptate dolor do ea commodo. Veniam voluptate cupidatat ex nisi do ullamco
                      in quis elit.
                    </p>
                    <p>
                      Cillum proident veniam cupidatat pariatur laborum tempor cupidatat anim eiusmod id nostrud
                      pariatur tempor reprehenderit. Do esse ullamco laboris sunt proident est ea exercitation
                      cupidatat. Do Lorem eiusmod aliqua culpa ullamco consectetur veniam voluptate cillum. Dolor
                      consequat cillum tempor laboris mollit laborum reprehenderit reprehenderit veniam aliqua deserunt
                      cupidatat consequat id.
                    </p>
                    <p>
                      Est id tempor excepteur enim labore sint aliquip consequat duis minim tempor proident. Dolor
                      incididunt aliquip minim elit ea. Exercitation non officia eu id.
                    </p>
                    <p>
                      Ipsum ipsum consequat incididunt do aliquip pariatur nostrud. Qui ut sint culpa labore Lorem.
                      Magna deserunt aliquip aute duis consectetur magna amet anim. Magna fugiat est nostrud veniam.
                      Officia duis ea sunt aliqua.
                    </p>
                    <p>
                      Ipsum minim officia aute anim minim aute aliquip aute non in non. Ipsum aliquip proident ut dolore
                      eiusmod ad fugiat fugiat ut ex. Ea velit Lorem ut et commodo nulla voluptate veniam ea et aliqua
                      esse id. Pariatur dolor et adipisicing ea mollit. Ipsum non irure proident ipsum dolore aliquip
                      adipisicing laborum irure dolor nostrud occaecat exercitation.
                    </p>
                    <p>
                      Culpa qui reprehenderit nostrud aliqua reprehenderit et ullamco proident nisi commodo non ut.
                      Ipsum quis irure nisi sint do qui velit nisi. Sunt voluptate eu reprehenderit tempor consequat
                      eiusmod Lorem irure velit duis Lorem laboris ipsum cupidatat. Pariatur excepteur tempor veniam
                      cillum et nulla ipsum veniam ad ipsum ad aute. Est officia duis pariatur ad eiusmod id voluptate.
                    </p>
                  </>
                ),
                actions: () => (
                  <Button variant="solid" onClick={() => (open.value = false)}>
                    Close
                  </Button>
                ),
              }}
            </Modal>
          </div>
        )
      },
    }
  },
}
