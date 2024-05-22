<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { input, isEmpty } from '@ciao/theme'
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

const isPlaceholderShown = computed(() => {
  const { modelValue: inputValue } = props
  const ref = _inputRef.value
  console.log('placeholder showne', inputValue)
  return ref
    ? (!ref.value || ref.value === '' || !inputValue || inputValue === '') && hasPlaceholder.value
    : false
})

const _baseProps = computed(() => {
  const { disabled, label } = props
  return {
    'data-hover': !disabled && hovered.value,
    'data-has-label': !!label,
    'data-focus': focused.value,
    'data-filled-within': isFilledWithin.value || hasPlaceholder.value || isPlaceholderShown.value,
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
  const { disabled, placeholder } = props
  return {
    ref: _inputRef,
    disabled,
    placeholder,
  }
})

const labelPlacement = computed<InputLabelPlacements>(() => {
  const { labelPlacement, label, placeholder } = props
  if (labelPlacement === 'inside') {
    if (!label)
      return 'outside'
    // else if (placeholder)
    //   return 'multiline'
  }
  return labelPlacement
})

const slots = computed(() => {
  const { variant, radius, size, color, required, disabled } = props
  return input({
    variant,
    radius,
    size,
    color,
    required,
    disabled,
    labelPlacement: labelPlacement.value,
  })
})

function handleFocusInput(e: MouseEvent) {
  if (_inputRef.value && e.currentTarget === e.target)
    _inputRef.value.focus()
}

function handleInput(e: Event) {
  const { value } = e.target as HTMLInputElement
  emits('update:modelValue', value)
}
</script>

<template>
  <div
    ref="_ref"
    :class="slots.base()"
    v-bind="_baseProps"
  >
    <div :class="slots.mainWrapper()">
      <div
        :class="slots.inputWrapper()"
        v-bind="_inputWrapperProps"
        @click="handleFocusInput"
      >
        <label :class="slots.label()">{{ label }}</label>
        <div
          :class="slots.innerWrapper()"
          v-bind="_innerWrapperProps"
          :style="{ cursor: 'text' }"
          @click="handleFocusInput"
        >
          <input
            v-bind="_inputProps"
            :class="slots.input()"
            @input="handleInput"
          >
        </div>
      </div>
      <!-- error message  -->
    </div>
  </div>
</template>
