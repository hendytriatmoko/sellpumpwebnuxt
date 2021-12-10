import colors from 'vuetify/es5/util/colors'
import webpack from 'webpack'

export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },


  server: {
    port: 555,
    host: '0.0.0.0'
  },
  googleAnalytics: {
    id: 'G-3WYJ4DQ0V5'
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Home',
    title: 'SiMotor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'facebook-domain-verification', content: 'ohrgnygpayjvnio2u0gjd9e08wgk0h' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/helper' },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/vue-image-upload.js', mode: 'client' },
    { src: '~/plugins/date-time-picker.js', mode: 'client' },
    { src: '~/plugins/firebaseui.js', mode: 'client' },
    { src: '~/plugins/vue-editor.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    [
      '@nuxtjs/firebase',
      {
        config: {
          // apiKey: "AIzaSyB2fsNR4-M_6YBO65sF0x9MemAXLY_5gDQ",
          // authDomain: "simotor-dna.firebaseapp.com",
          // databaseURL: "https://simotor-dna.firebaseio.com",
          // projectId: "simotor-dna",
          // storageBucket: "simotor-dna.appspot.com",
          // messagingSenderId: "73051776825",
          // appId: "1:73051776825:web:250eaa838d239d94",
          // measurementId: "G-23ZJ6QFKBV"
          apiKey: "AIzaSyD2w8s4gCjiENlJdBORtSkZ6e5pghzVQDY",
          authDomain: "simotordev.firebaseapp.com",
          databaseURL: "https://simotordev.firebaseio.com",
          projectId: "simotordev",
          storageBucket: "simotordev.appspot.com",
          messagingSenderId: "1089890778962",
          appId: "1:1089890778962:web:12e78426fa6969e896448b"
        },
        services: {
          auth: true,
          firestore: true,
        }
      }
    ],
    'vue-social-sharing/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL + '/api'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
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
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ]
  },

  oneSignal: {
    init: {
      appId: '9af3274a-447f-482f-bca6-ec68dc143418',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      }
    }
  },

  router: {
    middleware: ['auth']
  }
}
