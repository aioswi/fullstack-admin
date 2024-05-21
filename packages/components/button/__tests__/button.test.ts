import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from '../src/button.vue'
import Spinner from '../../spinner/src/spinner.vue'
import Ripple from '../../ripple/src/ripple.vue'

const BUTTON_TEXT = 'Hello CiaoUI'

describe('button', () => {
  expect(Button).toBeTruthy()
  it('should render correctly', () => {
    const wrapper = mount(Button, {
      props: {},
    })

    expect(wrapper.findComponent(Ripple).exists()).toBeTruthy()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger click event', async () => {
    const wrapper = mount(Button, {
      props: {},
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should render text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: BUTTON_TEXT,
      },
    })
    expect(wrapper.text()).toBe(BUTTON_TEXT)
  })

  it('disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.findComponent(Spinner).exists()).toBeTruthy()
  })

  it('should disabled while loading', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('should render spinner slot', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        spinner: () => h(
          'p',
          {
            class: 'custom-spinner',
          },
          'custom spinner',
        ),
      },
    })

    expect(wrapper.find('.custom-spinner').exists()).toBeTruthy()
  })

  it('should not render ripple while set rippled to false', () => {
    const wrapper = mount(Button, {
      props: {
        rippled: false,
      },
    })
    expect(wrapper.findComponent(Ripple).exists()).toBeFalsy()
  })
})
