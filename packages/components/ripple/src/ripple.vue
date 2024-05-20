<script setup lang="ts">
import type { PropType } from 'vue'
import type { RippleType } from './use-ripple'

defineProps({
  ripples: {
    type: Array as PropType<RippleType[]>,
    default: () => [],
  },
  color: {
    type: String,
    default: 'currentColor',
  },
})

const emit = defineEmits({
  clear: (key: string) => key,
})
</script>

<template>
  <TransitionGroup>
    <span
      v-for="ripple in ripples"
      :key="ripple.key"
      class="animate-ripple"
      :style="{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        borderRadius: '100%',
        backgroundColor: color,
        transformOrigin: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
        top: `${ripple.y}px`,
        left: `${ripple.x}px`,
        width: `${ripple.size}px`,
        height: `${ripple.size}px`,
      }"
      @animationend="emit('clear', ripple.key)"
    />
  </TransitionGroup>
</template>
