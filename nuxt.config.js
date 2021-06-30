export default {
  // Disable the Progress Bar
  loading: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'portfolio',
    meta: [
      { charset: 'utf-8' },
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
    [
      'nuxt-font-loader-strategy',
      {
        fonts: [
          // Font
          {
            fileExtensions: ['woff2', 'woff'],
            fontFamily: 'opensans',
            fontFaces: [
              // Font-Face
              {
                preload: true,
                // localSrc: ['opensans', 'opensans-regular'],
                src: '@/assets/fonts/opensans-regular-webfont',
                fontStyle: 'normal',
              },
              // Font-Face
              {
                // localSrc: ['opensans', 'opensans-bold'],
                src: '@/assets/fonts/opensans-bold-webfont',
                fontWeight: 700,
              },
              // Font-Face
              {
                // localSrc: ['opensans', 'opensans-italic'],
                src: '@/assets/fonts/opensans-italic-webfont',
                fontStyle: 'italic',
              },
            ],
          },
          // Font
          {
            fileExtensions: ['woff2', 'woff'],
            fontFamily: 'oswald',
            fontFaces: [
              // Font-Face
              {
                preload: true,
                src: '@/assets/fonts/oswald-semibold-webfont',
                fontWeight: 600,
              },
              // Font-Face
              // {
              //   src: '@/assets/fonts/oswald-bold-webfont',
              //   fontWeight: 700,
              // },
            ],
          },
        ],
      },
    ],
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
