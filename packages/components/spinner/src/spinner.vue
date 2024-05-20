<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { spinner } from '@ciao/theme'
import type { SpinnerColors, SpinnerLabelColors, SpinnerSizes } from './spinner'

const props = defineProps({
  size: {
    type: String as PropType<SpinnerSizes>,
    default: 'sm',
  },
  color: {
    type: String as PropType<SpinnerColors>,
    default: 'primary',
  },
  label: {
    type: String,
  },
  labelColor: {
    type: String as PropType<SpinnerLabelColors>,
    default: 'primary',
  },
})

const _ref = ref<HTMLElement>()

const slots = computed(() => spinner(props))

defineExpose({
  /** @description html element */
  ref: _ref,
})
</script>

<template>
  <div ref="_ref" :class="[slots.base()]">
    <svg
      :class="slots.wrapper()"
      class=""
      viewBox="25 25 50 50"
    >
      <circle
        :class="[slots.ring()]"
        cx="50"
        cy="50"
        r="20"
        fill="none"
      />
    </svg>
    <span v-if="$slots.default || label" :class="[slots.label()]">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>
