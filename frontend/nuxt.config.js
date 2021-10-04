export default {
  // Define environment variables that are required at build time: https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config#env
  env: {
    // BASE_URL_PROD: process.env.BASE_URL_PROD,
    TELEGRAM_API_URL: process.env.TELEGRAM_API_URL,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  },

  // Disable the Progress Bar
  loading: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'portfolio',
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/app.scss'],

  // Global sass resources
  styleResources: {
    scss: ['~/assets/styles/helpers/_all.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/lazyLoad', ssr: false }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // '@nuxt/image',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      'nuxt-font-loader-strategy',
      {
        fonts: [
          {
            fileExtensions: ['woff2', 'woff'],
            fontFamily: 'univa-pro',
            fontFaces: [
              {
                preload: true,
                src: '@/assets/fonts/UniviaPro-Regular',
                fontStyle: 'normal',
              },
              {
                src: '@/assets/fonts/UniviaPro-Light',
                fontWeight: 300,
              },
            ],
          },
          {
            fileExtensions: ['woff2', 'woff'],
            fontFamily: 'monument',
            fontFaces: [
              {
                preload: true,
                src: '@/assets/fonts/monumentextended-regular-webfont',
                fontStyle: 'normal',
              },
              {
                src: '@/assets/fonts/monumentextended-ultrabold-webfont',
                fontWeight: 700,
              },
            ],
          },
        ],
      },
    ],
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // Generate static files (https://nuxtjs.org/docs/configuration-glossary/configuration-generate)
  generate: {
    fallback: '404.html',
    subFolders: false,
  },
}
