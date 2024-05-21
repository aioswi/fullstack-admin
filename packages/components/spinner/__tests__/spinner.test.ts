import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Spinner from '../src/spinner.vue'

const SPINNER_TEXT = 'Hello spinner!'

describe('spinner', () => {
  expect(Spinner).toBeTruthy()

  it('should render correctly', () => {
    const wrapper = mount(Spinner, {
      props: {},
    })

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render text', () => {
    const wrapper = mount(Spinner, {
      props: {
        label: SPINNER_TEXT,
      },
    })

    expect(wrapper.text()).toBe(SPINNER_TEXT)
  })
})
