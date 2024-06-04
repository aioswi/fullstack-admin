<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { divider } from '@ciaoui/theme'

import type { DividerOrientation } from './divider'

const props = defineProps({
  orientation: {
    type: String as PropType<DividerOrientation>,
    default: 'horizontal',
  },
})

const styles = computed(() => divider({
  orientation: props.orientation,
}))
</script>

<template>
  <div :class="styles" />
</template>
