<script setup lang="ts">
const _colorMode = useColorMode()
</script>

<template>
  <div>
    <NuxtWelcome />
    <h1>Vue turbo starter</h1>
    <slot />
  </div>
</template>
