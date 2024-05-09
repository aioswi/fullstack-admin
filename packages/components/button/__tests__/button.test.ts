import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'

describe('button', () => {
  expect(Button).toBeTruthy()
  const wrapper = mount(Button)

  it('default button', () => {
    expect(wrapper.text()).toBe('This is a button')
  })
})
