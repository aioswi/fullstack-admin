<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { button } from '@ciao/theme'
import { useElementHover, useMousePressed } from '@vueuse/core'
import Ripple, { useRipple } from '../../ripple'
import Spinner, { type SpinnerSizes } from '../../spinner'
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

const { ripples, onClick: onRippleClick, onClear: onRippleClear } = useRipple()

const { pressed } = useMousePressed({ target: _ref })

const hovered = useElementHover(_ref)

const _disabled = computed(() => {
  const { disabled, loading } = props
  return disabled || loading
})

const styles = computed(() => {
  const { size, color, variant, disableAnimation, radius } = props
  return button({
    size,
    color,
    variant,
    radius,
    disabled: _disabled.value,
    disableAnimation,
  })
})

const _props = computed(() => {
  const disabled = _disabled.value
  return {
    'data-pressed': pressed.value,
    'data-hover': !disabled && hovered.value,
    'ariaDisabled': disabled,
    'disabled': disabled,
  }
})

const spinnerSize = computed(() => {
  const { size = 'md' } = props
  const buttonSpinnerSizeMap: Record<string, SpinnerSizes> = {
    sm: 'sm',
    md: 'sm',
    lg: 'md',
  }
  return buttonSpinnerSizeMap[size]
})

function handleClick(evt: MouseEvent) {
  const { disabled, disableAnimation, rippled } = props
  if (rippled && !disabled && !disableAnimation)
    onRippleClick(evt)
  emit('click', evt)
}

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button disabled */
  disabled: _disabled,
})
</script>

<template>
  <button
    ref="_ref"
    :class="styles"
    v-bind="_props"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot name="spinner">
        <Spinner
          color="current"
          :size="spinnerSize"
        />
      </slot>
    </template>
    <slot>Button</slot>
    <Ripple
      v-if="rippled"
      :ripples="ripples"
      @clear="onRippleClear"
    />
  </button>
</template>
