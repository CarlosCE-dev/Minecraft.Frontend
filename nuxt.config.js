import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - La Vecindad',
    title: 'La Vecindad',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'animate.css'
  ],
  /*
  ** Style Resources
  */
  styleResources: {
    scss: [
      'assets/scss/main.scss',
      'assets/scss/color.scss',
    ]
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/confirm.js'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/i18n',
  ],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          'purple-light': '#5C62C5',
          'black': "#434B54",
          'brown-dark': '#3E2B1D',
          'brown-light': '#694C34',
          'brown-primary': '#563C29',
          'green-primary': '#3D6C20',
          'green-light': "#72B248",
          "common": "#989898",
          "uncommon": "#2F8D31",
          "rare": "#4B4FF0",
          "epic": "#974AB7",
          "legendary": "#EAA91A",
          "mythic": "#F4CA2C",
        }
      }
    }
  },
  env: {
    baseUrl:
      process.env.NODE_ENV === 'dev'
        ? 'http://127.0.0.1:3333'
        : 'https://minecraft-vecindad.herokuapp.com'
  },
  i18n: {
    strategy: "no_prefix",
    locales: [
      { 
        code: 'es',
        file: 'es-ES.js'
      }
    ],
    defaultLocale: 'es',
    lazy: true,
    langDir: 'resources/'
  }
}
