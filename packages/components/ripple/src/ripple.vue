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
      class="ciao-ripple"
      :style="{
        'position': 'absolute',
        'inset': 0,
        'zIndex': 0,
        'borderRadius': '100%',
        'backgroundColor': color,
        'transformOrigin': 'center',
        'pointerEvents': 'none',
        'overflow': 'hidden',
        'top': `${ripple.y}px`,
        'left': `${ripple.x}px`,
        'width': `${ripple.size}px`,
        'height': `${ripple.size}px`,
        '--ripple-duration': `${ripple.duration}ms`,
      }"
      @animationend="emit('clear', ripple.key)"
    />
  </TransitionGroup>
</template>

<style lang="css" scoped>
.ciao-ripple {
  animation: ripple var(--ripple-duration) ease-out forwards;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.35;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
