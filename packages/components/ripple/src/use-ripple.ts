import { ref } from 'vue'

export interface RippleType {
  key: string
  x: number
  y: number
  size: number
}

function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`
}

export function useRipple() {
  const ripples = ref<RippleType[]>([])

  function onClick(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement

    const size = Math.max(el.clientWidth, el.clientHeight)
    const rect = el.getBoundingClientRect()

    const ripple = {
      size,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
    }

    // ripples.value.push(ripple)
  }

  return {
    ripples,
    onClick,
  }
}

export type UseRippleReturn = ReturnType<typeof useRipple>
