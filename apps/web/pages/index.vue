<script setup lang="ts">
import Counter from '~/components/Counter.vue'

const route = useRoute()
</script>

<template>
  <div class="p-4">
    <Counter class="mb-4" />
    <h1>
      Nuxt Routing set up successfully!
    </h1>
    <p>
      Current route: {{ route.path }}
    </p>
    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
    >
      Learn more about Nuxt Routing
    </a>
  </div>
</template>
