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
    // '@nuxt/image',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-speedkit',
    '@nuxt/image',
  ],

  // nuxt speedkit for fonts loading (https://nuxt-speedkit.grabarzundpartner.dev/)
  speedkit: {
    // detection: {
    //   performance: true,
    //   browserSupport: true,
    // },
    // performanceMetrics: {
    //   device: {
    //     hardwareConcurrency: { min: 2, max: 48 },
    //     deviceMemory: { min: 2 },
    //   },
    //   timing: {
    //     fcp: 800,
    //     dcl: 1200,
    //   },
    //   lighthouseDetectionByUserAgent: false,
    // },
    // componentAutoImport: false,
    // componentPrefix: undefined,

    /**
     * IntersectionObserver rootMargin for Compoennts and Assets
     */
    // lazyOffset: {
    //   component: '0%',
    //   asset: '0%',
    // },
    fonts: [
      {
        family: 'univa-pro',
        fallback: ['sans-serif'],
        variances: [
          {
            sources: [
              { src: '@/assets/fonts/UniviaPro-Regular.woff', type: 'woff' },
              { src: '@/assets/fonts/UniviaPro-Regular.woff2', type: 'woff2' },
            ],
            style: 'normal',
            weight: 400,
          },
          {
            sources: [
              { src: '@/assets/fonts/UniviaPro-Light.woff', type: 'woff' },
              { src: '@/assets/fonts/UniviaPro-Light.woff2', type: 'woff2' },
            ],
            style: 'normal',
            weight: 300,
          },
        ],
      },
      {
        family: 'monument',
        fallback: ['sans-serif'],
        variances: [
          {
            sources: [
              { src: '@/assets/fonts/monumentextended-regular-webfont.woff', type: 'woff' },
              { src: '@/assets/fonts/monumentextended-regular-webfont.woff2', type: 'woff2' },
            ],
            style: 'normal',
            weight: 400,
          },
          {
            sources: [
              { src: '@/assets/fonts/monumentextended-ultrabold-webfont.woff', type: 'woff' },
              { src: '@/assets/fonts/monumentextended-ultrabold-webfont.woff2', type: 'woff2' },
            ],
            style: 'normal',
            fontWeight: 700,
          },
        ],
      },
    ],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
