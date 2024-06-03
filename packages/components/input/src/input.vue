<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref, useSlots, watch } from 'vue'
import { input } from '@ciaoui/theme'
import { isEmpty, isString } from '@ciaoui/shared-utils'
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
    type: String,
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
  /** label always float */
  labelAlwaysFloat: {
    type: Boolean,
  },
  invalid: {
    type: Boolean,
  },
  clearable: {
    type: Boolean,
  },
  validation: {
    type: [String, Function] as PropType<string | ((value: string) => string)>,
  },
  /** use password input type */
  password: {
    type: Boolean,
  },
  /** native min length */
  minlength: {
    type: Number,
  },
  /** native max length */
  maxlength: {
    type: Number,
  },
  showWordLimit: {
    type: Boolean,
  },
})

const emit = defineEmits({
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

const isPasswordVisible = computed(() =>
  props.password && !props.disabled && !props.readonly,
)

const isWordLimitVisible = computed(() =>
  props.showWordLimit
  && !!props.maxlength
  && !props.disabled
  && !props.readonly,
)

const isClearVisible = computed(() =>
  props.clearable
  && !props.disabled
  && !props.readonly
  && !props.password,
)

const isSuffixVisible = computed(() =>
  !!slots.suffix
  || props.password
  || props.clearable
  || isWordLimitVisible.value,
)

const errorMessage = computed(() => {
  const { validation } = props
  return typeof validation === 'string' ? validation : validation?.(inputValue.value) ?? ''
})

const isInvalid = computed(() => {
  const { invalid, validation } = props
  return invalid
    || (typeof validation === 'function' && !isEmpty(errorMessage.value))
    || (!isEmpty(validation) && isEmpty(inputValue.value))
})

const _baseProps = computed(() => {
  const { disabled, label } = props
  return {
    'data-hover': !disabled && hovered.value,
    'data-has-label': !!label,
    'data-focus': focused.value,
    'data-filled': isFilled.value,
    'data-filled-within': isFilledWithin.value || !!slots.prefix || hasPlaceholder.value || Boolean(inputValue.value),
    'data-invalid': isInvalid.value,
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
  const { disabled, placeholder, readonly, required, maxlength, minlength } = props
  return {
    'ref': _inputRef,
    disabled,
    placeholder,
    readonly,
    required,
    minlength,
    maxlength,
    'data-filled': isFilled.value,
    'data-filled-within': isFilledWithin.value,
    'data-has-prefix': !!slots.prefix,
    'data-has-suffix': isSuffixVisible.value,
    'aria-readonly': readonly,
    'aria-required': required,
  }
})

const _endButtonProps = computed(() => {
  const id = isPasswordVisible.value ? 'pwd' : 'clear'
  return {
    'data-testid': `ciao-${id}-btn`,
    'role': 'button',
    'tabIndex': 0,
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
    invalid: isInvalid.value,
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
  emit('update:modelValue', value)
  emit('input', value)
}

function handleClear() {
  inputValue.value = ''

  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  emit('input', '')
}

function handleChange(e: Event) {
  emit('change', (e.target as HTMLInputElement).value)
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
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  emit('input', '')
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
          <slot name="prefix" />
          <input
            v-bind="_inputProps"
            v-model="inputValue"
            :class="styleSlots.input()"
            :type="passwordVisible ? 'text' : 'password'"
            @blur="(e) => emit('blur', e)"
            @focus="(e) => emit('focus', e)"
            @change="handleChange"
            @input="handleInput"
          >
          <slot v-if="isSuffixVisible" name="suffix">
            <span
              v-if="isWordLimitVisible"
              data-testid="word-limit"
              :class="[styleSlots.limit()]"
            >
              {{ inputValue.length }} / {{ maxlength }}
            </span>
            <span
              v-if="isClearVisible"
              v-bind="_endButtonProps"
              :class="[styleSlots.button(), styleSlots.clearButton()]"
              @click="handleClear"
            >
              <CloseFilledIcon />
            </span>
            <span
              v-if="isPasswordVisible"
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
      <div v-if="isInvalid" :class="styleSlots.errorWrapper()">
        <div :class="styleSlots.errorMessage()">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
