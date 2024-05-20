<script setup lang="ts">
import { readableColor } from 'color2k'
import type { ColorPlateProps } from './color.model'

withDefaults(defineProps<ColorPlateProps>(), {
  isSemantic: false,
})
</script>

<template>
  <div class="flex flex-wrap flex-col p-4 gap-y-4">
    <div v-for="{ items, title } in colors" :key="title">
      <h2 class="text-xl font-bold text-foreground">
        {{ title }}
      </h2>
      <div class="flex flex-wrap gap-4 py-4">
        <template v-if="isSemantic">
          <div
            v-for="(c, index) in items"
            :key="c.color + index"
            class="flex flex-col justify-end h-14 w-24 rounded-md shadow-small p-2"
            :class="[c.className]"
          >
            <span class="text-sm" :class="[c.textClassName]">{{ c.color }}</span>
          </div>
        </template>
        <template v-else>
          <div
            v-for="(c, index) in items"
            :key="c.color + index"
            :style="{ backgroundColor: c.color }"
            class="flex flex-col justify-end h-14 w-24 rounded-md shadow-small p-2"
          >
            <span class="text-sm" :style="{ color: readableColor(c.color) }">{{ c.color }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
