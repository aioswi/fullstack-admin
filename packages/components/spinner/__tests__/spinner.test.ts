import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Spinner from '../src/spinner.vue'

describe('spinner', () => {
  expect(Spinner).toBeTruthy()

  it('should render correctly', () => {
    const wrapper = mount(Spinner, {
      props: {},
    })

    expect(() => wrapper.unmount()).not.toThrow()
  })
})
