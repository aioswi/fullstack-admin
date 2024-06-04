<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, provide, reactive, toRef } from 'vue'
import { buttonGroup } from '@ciaoui/theme'
import { buttonGroupContextKey } from './constants'
import type { ButtonColors, ButtonRadius, ButtonSizes, ButtonVariants } from './button'

const props = defineProps({
  color: {
    type: String as PropType<ButtonColors>,
    default: 'default',
  },
  size: {
    type: String as PropType<ButtonSizes>,
    default: 'md',
  },
  variant: {
    type: String as PropType<ButtonVariants>,
    default: 'solid',
  },
  /** disable the button */
  disabled: {
    type: Boolean,
  },
  disableAnimation: {
    type: Boolean,
  },
  radius: {
    type: String as PropType<ButtonRadius>,
    default: 'md',
  },
  /** ripple animation while click button */
  rippled: {
    type: Boolean,
    default: true,
  },
})

const styles = computed(() => {
  return buttonGroup()
})

provide(
  buttonGroupContextKey,
  reactive({
    color: toRef(props, 'color'),
    size: toRef(props, 'size'),
    variant: toRef(props, 'variant'),
    disabled: toRef(props, 'disabled'),
    disableAnimation: toRef(props, 'disableAnimation'),
    radius: toRef(props, 'radius'),
    rippled: toRef(props, 'rippled'),
  }),
)
</script>

<template>
  <div :class="styles">
    <slot />
  </div>
</template>
