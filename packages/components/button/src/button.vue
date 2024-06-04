<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, inject, ref } from 'vue'
import { button } from '@ciaoui/theme'
import { useElementHover, useMousePressed } from '@vueuse/core'
import Ripple, { useRipple } from '../../ripple'
import Spinner, { type SpinnerSizes } from '../../spinner'
import { buttonGroupContextKey } from './constants'
import type { ButtonColors, ButtonRadius, ButtonSizes, ButtonVariants } from './button'

const props = defineProps({
  /** determine if the button is loading */
  loading: {
    type: Boolean,
    default: false,
  },
  /** define the style of the button */
  color: {
    type: String as PropType<ButtonColors>,
  },
  size: {
    type: String as PropType<ButtonSizes>,
    default: 'md',
  },
  variant: {
    type: String as PropType<ButtonVariants>,
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
  rippled: {
    type: Boolean,
    default: true,
  },
  onlyIcon: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
})

const buttonGroupContext = inject(buttonGroupContextKey, null)

const _ref = ref<HTMLButtonElement>()

const { ripples, onClick: onRippleClick, onClear: onRippleClear } = useRipple()

const { pressed } = useMousePressed({ target: _ref })

const hovered = useElementHover(_ref)

const _disabled = computed(() => buttonGroupContext?.disabled || props.disabled || props.loading)
const _size = computed(() => buttonGroupContext?.size || props.size)
const _color = computed(() => props.color ?? buttonGroupContext?.color ?? 'default')
const _variant = computed(() => props.variant ?? buttonGroupContext?.variant ?? 'solid')
const _radius = computed(() => buttonGroupContext?.radius ?? props.radius)
const _disableAnimation = computed(() => buttonGroupContext?.disableAnimation ?? props.disableAnimation)
const _rippled = computed(() => buttonGroupContext?.rippled ?? props.rippled)

const isInGroup = computed(() => !!buttonGroupContext)

const styles = computed(() => button({
  size: _size.value,
  color: _color.value,
  variant: _variant.value,
  radius: _radius.value,
  disabled: _disabled.value,
  disableAnimation: _disableAnimation.value,
  isInGroup: isInGroup.value,
  onlyIcon: props.onlyIcon,
}),
)

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
  if (_rippled.value && !_disabled.value && !_disableAnimation.value)
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
      v-if="_rippled"
      :ripples="ripples"
      @clear="onRippleClear"
    />
  </button>
</template>
