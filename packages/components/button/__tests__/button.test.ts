import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'

describe('button', () => {
  expect(Button).toBeTruthy()
  const wrapper = mount(Button, {
    props: {},
  })

  it('default button', () => {
    expect(wrapper.text()).toBe('Button Text')
  })
})
