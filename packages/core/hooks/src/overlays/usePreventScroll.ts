import { type Ref, watch } from 'vue'
import { chain } from '@ciaoui/shared-utils'

let restore: () => void

function setStyle(element: HTMLElement, style: string, value: string) {
  const cur = element.style.getPropertyValue(style)
  element.style.setProperty(style, value)

  return () => {
    element.style.setProperty(style, cur)
  }
}

export function usePreventScroll(lock: Ref<boolean>, options: { disabled?: Ref<boolean> } = {}) {
  function preventScroll() {
    return chain(
      setStyle(document.documentElement, 'paddingRight', `${window.innerWidth - document.documentElement.clientWidth}px`),
      setStyle(document.documentElement, 'overflow', 'hidden'),
    )
  }

  watch([lock, options.disabled], ([lock, disabled]) => {
    if (disabled) {
      restore?.()
      return
    }

    if (lock)
      restore = preventScroll()
    else
      restore?.()
  })
}
