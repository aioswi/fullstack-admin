// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/interactions/src/useFocusVisible.ts#L120

import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { getOwnerDocument, getOwnerWindow, isMac, isVirtualClick } from '@ciaoui/shared-utils'

export type Modality = 'keyboard' | 'pointer' | 'virtual'
type HandlerEvent = PointerEvent | MouseEvent | KeyboardEvent | FocusEvent | null
type Handler = (modality: Modality, e: HandlerEvent) => void
export type FocusVisibleHandler = (isFocusVisible: boolean) => void
export interface FocusVisibleProps {
  isTextInput?: boolean
  autoFocus?: boolean
}

export interface FocusVisibleResult {
  isFocusVisible: Ref<boolean>
}

let currentModality: Modality | null = null
const changeHandlers = new Set<Handler>()

let hasEventBeforeFocus = false
let hasBlurredWindowRecently = false

const hasSetupGlobalListeners = new Map<Window, GlobalListenerData>()

const nonTextInputTypes = new Set([
  'checkbox',
  'radio',
  'range',
  'color',
  'file',
  'image',
  'button',
  'submit',
  'reset',
])

// Only Tab or Esc keys will make focus visible on text input elements
const FOCUS_VISIBLE_INPUT_KEYS: Record<string, boolean> = {
  Tab: true,
  Escape: true,
}

interface GlobalListenerData {
  focus: () => void
}

export function isFocusVisible(): boolean {
  return currentModality !== 'pointer'
}

function isValidKey(e: KeyboardEvent) {
  return !(e.metaKey || (!isMac() && e.altKey) || e.ctrlKey || e.key === 'Control' || e.key === 'Shift' || e.key === 'Meta')
}

function triggerChangeHandlers(modality: Modality, e: HandlerEvent) {
  for (const handler of changeHandlers)
    handler(modality, e)
}

function handleKeyboardEvent(e: KeyboardEvent) {
  hasEventBeforeFocus = true
  if (isValidKey(e)) {
    currentModality = 'keyboard'
    triggerChangeHandlers('keyboard', e)
  }
}

function handleClickEvent(e: MouseEvent) {
  if (isVirtualClick(e)) {
    hasEventBeforeFocus = true
    currentModality = 'virtual'
  }
}

function handlePointerEvent(e: PointerEvent | MouseEvent) {
  currentModality = 'pointer'
  if (e.type === 'mousedown' || e.type === 'pointerdown') {
    hasEventBeforeFocus = true
    triggerChangeHandlers('pointer', e)
  }
}

function handleFocusEvent(e: FocusEvent) {
  if (e.target === window || e.target === document)
    return

  if (!hasEventBeforeFocus && !hasBlurredWindowRecently) {
    currentModality = 'virtual'
    triggerChangeHandlers('virtual', e)
  }

  hasEventBeforeFocus = false
  hasBlurredWindowRecently = false
}

function handleWindowBlur() {
  hasEventBeforeFocus = false
  hasBlurredWindowRecently = true
}

function setupEvents(element?: HTMLElement | null) {
  if (typeof window === 'undefined' || hasSetupGlobalListeners.get(getOwnerWindow(element)))
    return

  const _window = getOwnerWindow(element)
  const _document = getOwnerDocument(element)

  _document.addEventListener('keydown', handleKeyboardEvent, true)
  _document.addEventListener('keyup', handleKeyboardEvent, true)
  _document.addEventListener('click', handleClickEvent, true)

  _window.addEventListener('focus', handleFocusEvent, true)
  _window.addEventListener('blur', handleWindowBlur, false)

  if (typeof PointerEvent !== 'undefined') {
    _document.addEventListener('pointerdown', handlePointerEvent, true)
    _document.addEventListener('pointermove', handlePointerEvent, true)
    _document.addEventListener('pointerup', handlePointerEvent, true)
  }
  else {
    _document.addEventListener('mousedown', handlePointerEvent, true)
    _document.addEventListener('mousemove', handlePointerEvent, true)
    _document.addEventListener('mouseup', handlePointerEvent, true)
  }

  _window.addEventListener('beforeunload', () => {
    removeEventListener(element)
  }, { once: true })

  hasSetupGlobalListeners.set(_window, { focus })
}

function removeEventListener(element?: HTMLElement | null) {
  const _window = getOwnerWindow(element)
  const _document = getOwnerDocument(element)

  if (!hasSetupGlobalListeners.has(_window))
    return

  _window.HTMLElement.prototype.focus = hasSetupGlobalListeners.get(_window)!.focus

  _document.removeEventListener('keydown', handleKeyboardEvent, true)
  _document.removeEventListener('keyup', handleKeyboardEvent, true)
  _document.removeEventListener('click', handleClickEvent, true)

  _window.removeEventListener('focus', handleFocusEvent, true)
  _window.removeEventListener('blur', handleWindowBlur, false)

  if (typeof PointerEvent !== 'undefined') {
    _document.removeEventListener('pointerdown', handlePointerEvent, true)
    _document.removeEventListener('pointermove', handlePointerEvent, true)
    _document.removeEventListener('pointerup', handlePointerEvent, true)
  }
  else {
    _document.removeEventListener('mousedown', handlePointerEvent, true)
    _document.removeEventListener('mousemove', handlePointerEvent, true)
    _document.removeEventListener('mouseup', handlePointerEvent, true)
  }

  hasSetupGlobalListeners.delete(_window)
}

function isKeyboardFocusEvent(isTextInput: boolean, modality: Modality, e: HandlerEvent) {
  const IHTMLInputElement = typeof window !== 'undefined' ? getOwnerWindow(e?.target as Element).HTMLInputElement : HTMLInputElement
  const IHTMLTextAreaElement = typeof window !== 'undefined' ? getOwnerWindow(e?.target as Element).HTMLTextAreaElement : HTMLTextAreaElement
  const IHTMLElement = typeof window !== 'undefined' ? getOwnerWindow(e?.target as Element).HTMLElement : HTMLElement
  const IKeyboardEvent = typeof window !== 'undefined' ? getOwnerWindow(e?.target as Element).KeyboardEvent : KeyboardEvent

  isTextInput = isTextInput
  || (e?.target instanceof IHTMLInputElement && !nonTextInputTypes.has(e?.target?.type))
  || e?.target instanceof IHTMLTextAreaElement
  || (e?.target instanceof IHTMLElement && e?.target.isContentEditable)
  return !(isTextInput && modality === 'keyboard' && e instanceof IKeyboardEvent && !FOCUS_VISIBLE_INPUT_KEYS[e.key])
}

export function useFocusVisible(props: FocusVisibleProps = {}): FocusVisibleResult {
  const { isTextInput, autoFocus } = props

  const focusVisible = ref(autoFocus || isFocusVisible())

  useFocusVisibleListener((visible: boolean) => {
    focusVisible.value = visible
  }, { isTextInput })

  return {
    isFocusVisible: focusVisible,
  }
}

export function useFocusVisibleListener(fn: FocusVisibleHandler, opts?: { isTextInput?: boolean }) {
  setupEvents()

  const handler = (modality: Modality, e: HandlerEvent) => {
    if (!isKeyboardFocusEvent(!!(opts?.isTextInput), modality, e))
      return

    fn(isFocusVisible())
  }

  onMounted(() => {
    changeHandlers.add(handler)
  })

  onUnmounted(() => {
    changeHandlers.delete(handler)
  })
}
