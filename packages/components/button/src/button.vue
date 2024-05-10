<script lang="ts" setup>
withDefaults(
  defineProps<{
    /**
     * primary or secondary button
     */
    primary?: boolean
    /**
     * size of the button
     */
    size?: 'small' | 'medium' | 'large'
  }>(),
  { primary: false, size: 'medium' },
)

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

function onClick() {
  emit('click', 1)
}
</script>

<template>
  <button
    type="button"
    class="text-red-500"
    @click="onClick"
  >
    <slot>Button Text</slot>
  </button>
</template>
