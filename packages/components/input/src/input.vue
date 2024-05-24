<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref, useSlots, watch } from 'vue'
import { input } from '@ciao/theme'
import { isEmpty, isString } from '@ciao/shared-utils'
import { useElementHover, useFocus, useFocusWithin } from '@vueuse/core'
import { CloseFilledIcon, EyeFilledIcon, EyeSlashFilledIcon } from '../../icons'
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
  invalid: {
    type: Boolean,
  },
  clearable: {
    type: Boolean,
  },
  errorMessage: {
    type: [String],
  },
  /** @description use password input type */
  password: {
    type: Boolean,
  },
})

const emits = defineEmits({
  'update:modelValue': (value: string) => isString(value),
  'input': (value: string) => isString(value),
  'clear': () => true,
  'change': (value: string) => isString(value),
  'focus': (evt: FocusEvent) => evt instanceof FocusEvent,
  'blur': (evt: FocusEvent) => evt instanceof FocusEvent,
})

const slots = useSlots()

const _ref = ref<HTMLDivElement>()
const _innerWrapperRef = ref<HTMLDivElement>()
const _inputWrapperRef = ref<HTMLDivElement>()
const _inputRef = ref<HTMLInputElement>()

const hovered = useElementHover(_ref)

const { focused } = useFocus(_inputRef)
const { focused: isFocusWithin } = useFocusWithin(_inputWrapperRef)

const hasPlaceholder = computed(() => !!props.placeholder)

const inputValue = ref(props.modelValue)
const isFilled = computed(() => !isEmpty(inputValue.value))
const isFilledWithin = computed(() => isFilled.value || isFocusWithin.value)

const passwordVisible = ref(!props.password)

const _baseProps = computed(() => {
  const { disabled, label, errorMessage } = props
  return {
    'data-hover': !disabled && hovered.value,
    'data-has-label': !!label,
    'data-focus': focused.value,
    'data-filled': isFilled.value,
    'data-filled-within': isFilledWithin.value || hasPlaceholder.value || Boolean(inputValue.value),
    'data-invalid': !!errorMessage,
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
    'data-filled': isFilled.value,
    'data-filled-within': isFilledWithin.value,
    'data-has-prefix': !!slots.prefix,
    'data-has-suffix': !!slots.suffix,
    'aria-readonly': readonly,
    'aria-required': required,
  }
})

const _endButtonProps = computed(() => {
  return {
    role: 'button',
    tabIndex: 0,
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
  const {
    variant,
    radius,
    size,
    color,
    required,
    disabled,
    disableAnimation,
    labelAlwaysFloat,
    invalid,
    clearable,
    readonly,
    password,
  } = props
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
    invalid,
    clearable,
    readonly,
    password,
  })
})

function handleFocusInput(e: MouseEvent) {
  if (_inputRef.value && e.currentTarget === e.target)
    _inputRef.value.focus()
}

function handleInput(e: Event) {
  const { value } = e.target as HTMLInputElement
  emits('update:modelValue', value)
  emits('input', value)
}

function handleClear() {
  inputValue.value = ''

  emits('update:modelValue', '')
  emits('clear')
}

function handleChange(e: Event) {
  emits('change', (e.target as HTMLInputElement).value)
}

function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}

function blur() {
  _inputRef.value?.blur()
}

function focus() {
  _inputRef.value?.focus()
}

function clear() {
  inputValue.value = ''
  emits('update:modelValue', '')
  emits('change', '')
  emits('clear')
  emits('input', '')
}

watch(() => props.password, (val) => {
  passwordVisible.value = !val
})

defineExpose({
  /** @description HTML element, input */
  ref: _inputRef,

  /** @description HTML input element native method */
  focus,
  /** @description HTML input element native method */
  blur,
  /** @description clear input value */
  clear,
})
</script>

<template>
  <div
    ref="_ref"
    :class="styleSlots.base()"
    v-bind="_baseProps"
  >
    <label
      v-if="label && isLabelOutside"
      :class="styleSlots.label()"
    >
      {{ label }}
    </label>
    <div :class="styleSlots.mainWrapper()">
      <div
        :class="styleSlots.inputWrapper()"
        v-bind="_inputWrapperProps"
        @click="handleFocusInput"
      >
        <label
          v-if="label && !isLabelOutside"
          :class="styleSlots.label()"
        >
          {{ label }}
        </label>
        <div
          :class="styleSlots.innerWrapper()"
          v-bind="_innerWrapperProps"
          @click="handleFocusInput"
        >
          <input
            v-bind="_inputProps"
            v-model="inputValue"
            :class="styleSlots.input()"
            :type="passwordVisible ? 'text' : 'password'"
            @blur="(e) => emits('blur', e)"
            @focus="(e) => emits('focus', e)"
            @change="handleChange"
            @input="handleInput"
          >
          <!-- TODO: use more flexable slot -->
          <slot name="suffix">
            <span
              v-bind="_endButtonProps"
              :class="[styleSlots.button(), styleSlots.clearButton()]"
              @click="handleClear"
            >
              <CloseFilledIcon />
            </span>
            <span
              v-bind="_endButtonProps"
              :class="[styleSlots.button(), styleSlots.passwordButton()]"
              @click="togglePasswordVisible"
            >
              <EyeSlashFilledIcon v-if="passwordVisible" />
              <EyeFilledIcon v-else />
            </span>
          </slot>
        </div>
      </div>
      <!-- error message  -->
      <div v-if="invalid && errorMessage" :class="styleSlots.errorWrapper()">
        <div :class="styleSlots.errorMessage()">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
