import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from '../src/button.vue'

describe('button', () => {
  expect(Button).toBeTruthy()
  it('should render correctly', () => {
    const wrapper = mount(Button, {
      props: {},
    })

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger click event', async () => {
    const wrapper = mount(Button, {
      props: {},
    })
    await wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })
})
