import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Adaptaviz',
    title: 'Adaptaviz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' },
      { content: 'yes', name: 'apple-mobile-web-app-capable' },
      { content: 'yes', name: 'mobile-web-app-capable' },
      { hid: 'description', name: 'Adaptaviz calcule des indicateurs géolocalisés en croisant des données de prévisions météorologiques avec dans données agronomiques pour certaines espèces clés. Ceci permet de donner des pistes d’adaptation des cultures sur le territoire français sur différents scénarios et horizons temporels.', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "dns-prefetch",
        href: "//fonts.googleapis.com"
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'leaflet/dist/leaflet.css',
    '~/assets/typo.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/client/colors.client',
    '~/plugins/client/leaflet.client'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-webfontloader'
  ],

  webfontloader: {
    google: {
      families: [
        'Rajdhani:wght@300;400;500;600&display=swap'
      ]
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NUXT_BASE_API_URL || 'http://localhost:3000/api'
  },

  serverMiddleware: {
    '/api': '~/api'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'fr'
    },
    options: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0',
      ogSiteName: 'Adaptaviz',
      ogTitle: 'Adaptaviz',
      ogDescription: 'Adaptaviz calcule des indicateurs géolocalisés en croisant des données de prévisions météorologiques avec dans données agronomiques pour certaines espèces clés. Ceci permet de donner des pistes d’adaptation des cultures sur le territoire français sur différents scénarios et horizons temporels.',
      ogUrl: 'www.adaptaviz.fr',
      nativeUI: true
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    theme: {
      dark: true,
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
        ligth: {
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
    transpile: [/^vuetify/, 'vuex-persist'],
    extractCSS: true,
    standalone: true,
    ignoreOrder: false,
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: 'owalid',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        }
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
