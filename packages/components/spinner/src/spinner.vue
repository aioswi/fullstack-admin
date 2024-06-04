<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import { spinner } from '@ciaoui/theme'
import type { SpinnerColors, SpinnerSizes } from './spinner'

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
})

const _ref = ref<HTMLElement>()

const styles = computed(() => spinner(props))

defineExpose({
  /** @description html element */
  ref: _ref,
})
</script>

<template>
  <div ref="_ref" :class="[styles.base()]">
    <svg
      :class="styles.wrapper()"
      class=""
      viewBox="25 25 50 50"
    >
      <circle
        :class="[styles.ring()]"
        cx="50"
        cy="50"
        r="20"
        fill="none"
      />
    </svg>
    <span v-if="$slots.default || label" :class="[styles.label()]">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>
