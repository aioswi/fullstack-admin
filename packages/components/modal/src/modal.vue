<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { modal } from '@ciaoui/theme'
import { isBoolean } from '@ciaoui/shared-utils'
// import Button from '../../button'
import { CloseIcon } from '../../icons'
import type { ModalBackdrops } from './modal'

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  backdrop: {
    type: String as PropType<ModalBackdrops>,
    default: 'opaque',
  },
  hideCloseButton: {
    type: Boolean,
  },
  disableAnimation: {
    type: Boolean,
  },
})

const emit = defineEmits({
  'update:modelValue': (value: boolean) => isBoolean(value),
})

const styleSlots = computed(() => {
  const { backdrop } = props
  return modal({
    backdrop,
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
</script>

<template>
  <Teleport to="body">
    <TransitionGroup>
      <!-- backdrop -->
      <Transition
        v-bind="_transitionProps"
        enter-active-class="data-[animated=true]:animate-fade-in"
        leave-active-class="data-[animated=true]:animate-fade-out"
      >
        <div
          v-if="visible"
          :class="styleSlots.backdrop()"
          data-slot="backdrop"
        />
      </Transition>
      <!-- content -->
      <Transition v-bind="_transitionProps">
        <div
          v-if="visible"
          :class="styleSlots.wrapper()"
          data-slot="wrapper"
          @click.stop="visible = false"
        >
          <section :class="styleSlots.base()" data-slot="base">
            <button v-if="!hideCloseButton" :class="styleSlots.closeButton()">
              <CloseIcon />
            </button>
            测试
          </section>
        </div>
      </Transition>
    </TransitionGroup>
  </Teleport>
</template>
