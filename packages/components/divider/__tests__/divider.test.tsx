import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Divider from '../src/divider.vue'

describe('divider', () => {
  expect(Divider).toBeTruthy()

  it('should render correctly', () => {
    const wrapper = mount(() => (
      <Divider></Divider>
    ))

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render with custom class', () => {
    const wrapper = mount(() => (
      <Divider class="custom-divider-name"></Divider>
    ))

    expect(wrapper.classes()).toContain('custom-divider-name')
  })
})
