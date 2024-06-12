// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/interactions/src/useFocusVisible.ts#L120

import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useFocus } from '@vueuse/core'
import type { MaybeElementRef } from '@vueuse/core'
import { isFocusVisible, useFocusVisibleListener } from './useFocusVisible'

export interface FocusRingProps {
  isTextInput?: boolean
}

export interface UseFocusRingReturn {
  /** Whether the element is currently focused. */
  isFocused: Ref<boolean>

  /** Whether keyboard focus should be visible. */
  isFocusVisible: Ref<boolean>
}

/**
 * add event listener to the target element
 * only when the event is keyboard, then set focus-visible to true
 * when the event is mouse, then set focus-visible to false
 * @param target - the target element
 * @param opts - options
 * @param opts.isTextInput - whether the element is a text input
 */
export function useFocusRing(target: MaybeElementRef, opts: FocusRingProps = {}): UseFocusRingReturn {
  const { isTextInput = false } = opts

  const _focusVisible = ref(isFocusVisible())

  const { focused: isFocused } = useFocus(target)

  const focusVisible = computed(() => {
    return isFocused.value && _focusVisible.value
  })

  useFocusVisibleListener((visible: boolean) => {
    _focusVisible.value = visible
  }, { isTextInput })

  return {
    isFocused,
    isFocusVisible: focusVisible,
  }
}
