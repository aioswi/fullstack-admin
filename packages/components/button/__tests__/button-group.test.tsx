import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import ButtonGroup from '../src/button-group.vue'
import Button from '../src/button.vue'

describe('button group', () => {
  expect(ButtonGroup).toBeTruthy()

  it('should render correctly', () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button rippled={false}>action</Button>
      </ButtonGroup>
    ))

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore click event when group disabled', () => {
    const handleClick = vi.fn()

    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button data-testid="button-test" rippled={false} onClick={handleClick}>action</Button>
      </ButtonGroup>
    ))

    const button = wrapper.find('[data-testid="button-test"]')

    button.trigger('click')
    expect(handleClick).not.toHaveBeenCalled()
  })
})
