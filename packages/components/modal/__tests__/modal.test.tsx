import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { nextTick } from 'vue'
import Modal from '../src/modal.vue'

describe('modal', () => {
  expect(Modal).toBeTruthy()

  const OPTIONS = {
    global: {
      stubs: {
        Teleport: true,
      },
    },
  }

  it('should render correctly', () => {
    const wrapper = mount(() => (
      <Modal modelValue={true}>
        {{
          body: () => (
            <div>Body</div>
          ),
          actions: () => (
            <button>Close</button>
          ),
        }}
      </Modal>
    ))

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render title when it has been given', async () => {
    const TITLE = 'TEST TITLE'
    const wrapper = mount(
      <Modal modelValue={true} title={TITLE} />,
      OPTIONS,
    )

    await nextTick()
    expect(wrapper.find('header').text()).toEqual(TITLE)

    const SLOT_TITLE = 'SLOT TITLE'
    const slotWrapper = mount(
      <Modal
        modelValue={true}
        v-slots={{
          title: () => SLOT_TITLE,
        }}
      >
      </Modal>,
      OPTIONS,
    )

    await nextTick()
    expect(slotWrapper.find('header').text()).toEqual(SLOT_TITLE)
  })

  it('should hide the modal when pressing the escape key', () => {

  })
})
