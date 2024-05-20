<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { button } from '@ciao/theme'
import { useElementHover, useMousePressed } from '@vueuse/core'
import Ripple, { useRipple } from '../../ripple'
import type { ButtonColors, ButtonRadius, ButtonSizes, ButtonVariants } from './button'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
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
  rippled: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
})

const _ref = ref<HTMLButtonElement>()

const { ripples, onClick: onRippleClick } = useRipple()

const { pressed } = useMousePressed({ target: _ref })

const hovered = useElementHover(_ref)

const styles = computed(() => {
  const { size, color, variant, disabled, disableAnimation, radius } = props
  return button({
    size,
    color,
    variant,
    radius,
    disabled,
    disableAnimation,
  })
})

const _props = computed(() => {
  return {
    'data-pressed': pressed.value,
    'data-hover': hovered.value,
  }
})

function handleClick(evt: MouseEvent) {
  const { disabled, disableAnimation, rippled } = props
  if (rippled && !disabled && !disableAnimation)
    onRippleClick(evt)
  emit('click', evt)
}
</script>

<template>
  <button
    ref="_ref"
    :class="styles"
    v-bind="_props"
    @click="handleClick"
  >
    <slot>Button</slot>
    <Ripple v-if="rippled" />
  </button>
</template>
