<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const { count } = storeToRefs(counter)
</script>

<template>
  <div class="flex items-center justify-between">
    Counter: {{ count }}

    <div class="flex items-center space-x-2">
      <button @click="counter.increment">
        +
      </button>
      <button @click="counter.decrement">
        -
      </button>
    </div>
  </div>
</template>
