export default {
  // Define environment variables that are required at build time: https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config#env
  env: {
    // BASE_URL_PROD: process.env.BASE_URL_PROD,
    BASE_URL_BACK: process.env.BASE_URL_BACK,
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
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#fff',
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'msapplication-TileColor',
        content: '#0f1012',
      },
      {
        name: 'msapplication-TileImage',
        content: '/mstile-150x150.png',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'mask-icon',
        color: '#0f1012',
        href: '/safari-pinned-tab.svg',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/app.scss'],

  // Global sass resources
  styleResources: {
    scss: ['~/assets/styles/helpers/_all.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/lazyLoad', ssr: false },
    '~/plugins/getUrl',
    '~/plugins/jsonld',
    '~/plugins/svg-icon',
  ],

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
                src: '@/assets/fonts/monumentextended-black-webfont',
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

  // '@nuxtjs/pwa' module: https://pwa.nuxtjs.org/
  pwa: {
    meta: {
      favicon: false,
    },
    icon: {
      source: '/icon.png',
      sizes: [192, 512],
    },
    manifest: {
      name: 'Yurii Yaroshenko | Frontend developer',
      short_name: 'Yurii Yaroshenko',
      description: 'Yurii Yaroshenko | Frontend developer',
      lang: 'en',
      useWebmanifestExtension: true,
      theme_color: '#0f1012',
    },
  },
}
