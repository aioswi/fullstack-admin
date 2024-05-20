import { ref } from 'vue'

export interface RippleType {
  key: string
  x: number
  y: number
  size: number
  duration: number
}

function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function useRipple() {
  const ripples = ref<RippleType[]>([])

  function onClick(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement

    const size = Math.max(el.clientWidth, el.clientHeight)
    const rect = el.getBoundingClientRect()

    const length = ripples.value.length
    const duration = clamp(0.01 * size, 0.2, size > 100 ? 0.75 : 0.5)

    const ripple = {
      key: getUniqueID(length.toString()),
      size,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      duration: duration * 1000,
    }

    ripples.value.push(ripple)
  }

  function onClear(key: string) {
    ripples.value = ripples.value.filter(ripple => ripple.key !== key)
  }

  return {
    ripples,
    onClick,
    onClear,
  }
}

export type UseRippleReturn = ReturnType<typeof useRipple>
