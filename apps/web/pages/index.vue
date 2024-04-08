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
    <div class="rounded-small border-small p-2 shadow-small">
      测试 ciao
    </div>
    <div class="divide-y mt-2">
      <div class="">
        1
      </div>
      <div class="">
        2
      </div>
      <div class="">
        3
      </div>
    </div>
  </div>
</template>
