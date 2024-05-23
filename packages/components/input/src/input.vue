<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { input } from '@ciao/theme'
import { isEmpty, isString } from '@ciao/shared-utils'
import { useElementHover, useFocus, useFocusWithin } from '@vueuse/core'
import type {
  InputColors,
  InputLabelPlacements,
  InputRadius,
  InputSizes,
  InputVariants,
} from './input'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
  },
  variant: {
    type: String as PropType<InputVariants>,
    default: 'flat',
  },
  size: {
    type: String as PropType<InputSizes>,
    default: 'md',
  },
  color: {
    type: String as PropType<InputColors>,
    default: 'default',
  },
  radius: {
    type: String as PropType<InputRadius>,
    default: 'md',
  },
  required: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  disableAnimation: {
    type: Boolean,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  labelPlacement: {
    type: String as PropType<InputLabelPlacements>,
    default: 'inside',
  },
  placeholder: {
    type: String,
  },
  /** @description label always float */
  labelAlwaysFloat: {
    type: Boolean,
  },
})

const emits = defineEmits({
  'update:modelValue': (value: string) => typeof value === 'string',
})

const _ref = ref<HTMLDivElement>()
const _innerWrapperRef = ref<HTMLDivElement>()
const _inputWrapperRef = ref<HTMLDivElement>()
const _inputRef = ref<HTMLInputElement>()

const hovered = useElementHover(_ref)

const { focused } = useFocus(_inputRef)
const { focused: isFocusWithin } = useFocusWithin(_inputWrapperRef)

const isFilled = computed(() => !isEmpty(props.modelValue))
const isFilledWithin = computed(() => isFilled.value || isFocusWithin.value)

const hasPlaceholder = computed(() => !!props.placeholder)

const inputValue = ref(props.modelValue)

const _baseProps = computed(() => {
  const { disabled, label } = props
  return {
    'data-hover': !disabled && hovered.value,
    'data-has-label': !!label,
    'data-focus': focused.value,
    'data-filled-within': isFilledWithin.value || hasPlaceholder.value || Boolean(inputValue.value),
  }
})

const _innerWrapperProps = computed(() => {
  return {
    ref: _innerWrapperRef,
  }
})

const _inputWrapperProps = computed(() => {
  const { disabled } = props
  return {
    'ref': _inputWrapperRef,
    'data-hover': !disabled && hovered.value,
    'data-focus': focused.value,
  }
})

const _inputProps = computed(() => {
  const { disabled, placeholder, readonly, required } = props
  return {
    'ref': _inputRef,
    disabled,
    placeholder,
    readonly,
    required,
    'aria-readonly': readonly,
    'aria-required': required,
  }
})

const labelPlacement = computed<InputLabelPlacements>(() => {
  const { labelPlacement, label } = props
  if (labelPlacement === 'inside' && !label)
    return 'outside'
  return labelPlacement
})

const isLabelOutside = computed(() => {
  const { labelAlwaysFloat } = props
  return labelPlacement.value === 'outside-left' || (labelPlacement.value === 'outside' && labelAlwaysFloat)
})

const styleSlots = computed(() => {
  const { variant, radius, size, color, required, disabled, disableAnimation, labelAlwaysFloat } = props
  return input({
    variant,
    radius,
    size,
    color,
    required,
    disabled,
    labelPlacement: labelPlacement.value,
    disableAnimation,
    labelAlwaysFloat,
  })
})

function handleFocusInput(e: MouseEvent) {
  if (_inputRef.value && e.currentTarget === e.target)
    _inputRef.value.focus()
}

function handleInput(e: Event) {
  const { value } = e.target as HTMLInputElement

  inputValue.value = value
  emits('update:modelValue', value)
}
</script>

<template>
  <div
    ref="_ref"
    :class="styleSlots.base()"
    v-bind="_baseProps"
  >
    <label v-if="isLabelOutside" :class="styleSlots.label()">{{ label }}</label>
    <div
      :class="styleSlots.inputWrapper()"
      v-bind="_inputWrapperProps"
      @click="handleFocusInput"
    >
      <label v-if="!isLabelOutside" :class="styleSlots.label()">{{ label }}</label>
      <div
        :class="styleSlots.innerWrapper()"
        v-bind="_innerWrapperProps"
        @click="handleFocusInput"
      >
        <input
          v-bind="_inputProps"
          :class="styleSlots.input()"
          @input="handleInput"
        >
      </div>
    </div>
    <!-- error message  -->
  </div>
</template>
