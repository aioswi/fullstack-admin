// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // head
    head: {
      title: 'Full stack admin',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Nuxt + turborepo',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  devtools: { enabled: true },
  components: [
    {
      path: '../../packages/components',
      pathPrefix: false,
      extensions: ['vue'],
    },
  ],
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  typescript: {
    shim: false,
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    classSuffix: '',
  },
})
