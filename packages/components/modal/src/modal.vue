<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import type { PropType } from 'vue'
import { modal } from '@ciaoui/theme'
import { isBoolean } from '@ciaoui/shared-utils'
import { usePreventScroll } from '@ciaoui/hooks'
import { useFocus } from '@vueuse/core'
import { CloseIcon } from '../../icons'
import type {
  ModalBackdrops,
  ModalDismissBehavior,
  ModalPlacements,
  ModalRadius,
  ModalScrollBehavior,
  ModalShadows,
  ModalSizes,
} from './modal'

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  size: {
    type: String as PropType<ModalSizes>,
    default: 'md',
  },
  radius: {
    type: String as PropType<ModalRadius>,
    default: 'lg',
  },
  shadow: {
    type: String as PropType<ModalShadows>,
    default: 'sm',
  },
  placement: {
    type: String as PropType<ModalPlacements>,
    default: 'auto',
  },
  backdrop: {
    type: String as PropType<ModalBackdrops>,
    default: 'opaque',
  },
  scrollBehavior: {
    type: String as PropType<ModalScrollBehavior>,
    default: 'normal',
  },
  hideCloseButton: {
    type: Boolean,
  },
  disableAnimation: {
    type: Boolean,
  },
  dismissBehavior: {
    type: String as PropType<ModalDismissBehavior>,
    default: 'all',
  },
  /** Whether to lock the body scrolling when the Dialog appears */
  lockScroll: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits({
  'update:modelValue': (value: boolean) => isBoolean(value),
  'closed': () => true,
})

const lockScroll = toRef(props, 'lockScroll')

const _closeButtonRef = ref(null)

const { focused: isCloseButtonFocusVisible } = useFocus(_closeButtonRef, { focusVisible: true })

const _closeButtonProps = computed(() => {
  return {
    'aria-label': 'Close',
    'data-focus-visible': isCloseButtonFocusVisible.value,
    'tabindex': 0,
    'role': 'button',
  }
})

const styleSlots = computed(() => {
  return modal({
    ...props,
  })
})

const _transitionProps = computed(() => ({
  'data-animated': !props.disableAnimation,
}))

const visible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const disableLockScroll = computed(() => !lockScroll.value)

usePreventScroll(visible, { disabled: disableLockScroll })

defineExpose({
  /**  whether the modal is visible */
  visible,
})
</script>

<template>
  <div :tabindex="-1">
    <Teleport to="body">
      <!-- backdrop -->
      <Transition
        key="backdrop"
        v-bind="_transitionProps"
        enter-active-class="data-[animated=true]:animate-fade-in"
        leave-active-class="data-[animated=true]:animate-fade-out"
        @after-leave="emit('closed')"
      >
        <div
          v-if="visible"
          :class="styleSlots.backdrop()"
          data-slot="backdrop"
        />
      </Transition>
      <!-- content -->
      <Transition
        key="modal"
        v-bind="_transitionProps"
        enter-active-class="data-[animated=true]:animate-modal-enter"
        leave-active-class="data-[animated=true]:animate-modal-exit"
      >
        <div
          v-if="visible"
          :class="styleSlots.wrapper()"
          :tabindex="-1"
          data-slot="wrapper"
          @keydown.esc="() => (dismissBehavior === 'escape' || dismissBehavior === 'all') && (visible = false)"
          @click.self="() => (dismissBehavior === 'click' || dismissBehavior === 'all') && (visible = false)"
        >
          <section :class="styleSlots.base()" data-slot="base">
            <button
              v-if="!hideCloseButton"
              ref="_closeButtonRef"
              v-bind="_closeButtonProps"
              :class="styleSlots.closeButton()"
              @click="visible = false"
            >
              <CloseIcon />
            </button>
            <slot>
              <slot name="header">
                <header :class="styleSlots.header()">
                  <slot name="title">
                    {{ title }}
                  </slot>
                </header>
              </slot>
              <div
                v-if="$slots.body"
                :class="styleSlots.body()"
              >
                <slot name="body" />
              </div>
              <slot name="footer">
                <footer v-if="$slots.actions" :class="styleSlots.footer()">
                  <slot name="actions" />
                </footer>
              </slot>
            </slot>
          </section>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
