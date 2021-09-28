export default {
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/app.scss'],

  // Global sass resources
  styleResources: {
    scss: ['~/assets/styles/helpers/_all.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-speedkit',
  ],

  // nuxt speedkit for fonts loading (https://nuxt-speedkit.grabarzundpartner.dev/)
  speedkit: {
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

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
