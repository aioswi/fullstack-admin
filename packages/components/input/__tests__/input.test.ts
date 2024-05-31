import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'

import Input from '../src/input.vue'

describe('input', () => {
  expect(Input).toBeTruthy()

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render correctly', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Email',
        placeholder: 'Please enter your email',
      },
    })

    const inputElm = wrapper.find('input')
    const nativeInput = inputElm.element

    expect(inputElm.exists()).toBeTruthy()
    expect(() => wrapper.unmount()).not.toThrow()
    expect(nativeInput.placeholder).toBe('Please enter your email')

    const label = wrapper.find('label')
    expect(label.exists()).toBeTruthy()
    expect(label.text()).toBe('Email')
  })

  it('should be empty by default', () => {
    const wrapper = mount(Input, {
      props: {},
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.element.value).toBe('')
  })

  it('should be disabled', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true,
      },
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.attributes('disabled')).toBeDefined()
  })

  it('should be readonly', () => {
    const wrapper = mount(Input, {
      props: {
        readonly: true,
      },
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.attributes('readonly')).toBeDefined()
  })

  it('should show password button', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '123456',
        password: true,
      },
    })

    const inputEle = wrapper.find('input')
    const native = inputEle.element

    expect(native.type).toBe('password')

    const pwd = wrapper.find('#ciao-pwd-btn')
    expect(pwd.exists()).toBe(true)

    await pwd.trigger('click')
    expect(native.type).toBe('text')
  })

  it('should limit input and show word count', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '12345',
        maxlength: 5,
        showWordLimit: true,
      },
    })
    const inputEle = wrapper.find('input')
    const native = inputEle.element

    await inputEle.trigger('input')
    expect(native.value).toBe('12345')
  })

  describe('input events', () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    it('event:focus & blur', async () => {
      const content = ref('')
      const wrapper = mount(Input, {
        props: {
          onBlur: handleBlur,
          onFocus: handleFocus,
          modelValue: content.value,
        },
      })

      const input = wrapper.find('input')

      await input.trigger('focus')
      expect(handleFocus).toBeCalled()

      await input.trigger('blur')
      expect(handleBlur).toBeCalled()
    })

    it('event:change', async () => {
      const content = ref('')

      const handleChange = (val: string) => {
        content.value = val
      }

      const wrapper = mount(Input, {
        props: {
          modelValue: content.value,
          onChange: handleChange,
        },
      })
      const el = wrapper.find('input').element
      wrapper.vm
      const simulateEvent = (text: string, event: string) => {
        el.value = text
        el.dispatchEvent(new Event(event))
      }

      // simplified test, component should emit change when native does
      simulateEvent('2', 'change')
      await nextTick()
      expect(content.value).toBe('2')
      simulateEvent('1', 'input')
      await nextTick()
      expect(content.value).toBe('2')
    })

    it('event:clear', async () => {
      const content = ref('ciao ui')
      const handleClear = vi.fn()
      const handleInput = vi.fn()

      const wrapper = mount(Input, {
        props: {
          'modelValue': content.value,
          'onUpdate:modelValue': e => content.value = e,
          'clearable': true,
          'onClear': handleClear,
          'onInput': handleInput,
        },
      })

      // find clear button
      const clear = wrapper.find('#ciao-clear-btn')
      await clear.trigger('click')
      expect(clear.exists()).toBe(true)
      // click clear button
      expect(handleClear).toBeCalled()
      expect(content.value).toBe('')
      expect(handleInput).toBeCalled()
    })

    it('event:input', async () => {
      const content = ref('hello')
      const handleInput = vi.fn()

      const wrapper = mount(Input, {
        props: {
          modelValue: content.value,
          onInput: handleInput,
        },
      })

      const inputEle = wrapper.find('input')
      const native = inputEle.element

      native.value = '1'
      await inputEle.trigger('input')
      native.value = '2'
      await inputEle.trigger('input')

      expect(handleInput).toBeCalledTimes(2)
      expect(content.value).toBe('hello')
      expect(native.value).toBe('2')
    })
  })
})
