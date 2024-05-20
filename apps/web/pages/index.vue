<script setup lang="ts">
import Counter from '~/components/Counter.vue'

const route = useRoute()
</script>

<template>
  <div class="p-4">
    <Counter class="my-4 p-2 border-small rounded-full" />
    <Button
      variant="ghost"
      color="primary"
    >
      测试按钮
    </Button>
    <h1>Nuxt Routing set up successfully!</h1>
    <p class="font-sans text-2xl font-medium leading-6 py-5">
      Current route: {{ route.path }}
    </p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">
      Learn more about Nuxt Routing
    </a>
    <div class="rounded-small border-small p-2 shadow-medium my-4">
      测试 ciao
    </div>
    <div class="divide-y my-2">
      <div class="">
        1
      </div>
      <div class="text-blue-500">
        2
      </div>
      <div class="">
        3
      </div>
    </div>
  </div>
</template>
