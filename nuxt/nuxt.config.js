import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "static",
  ssr: false,
  server: {
    port: process.env.PORT || 3000,
  },
  head: {
    titleTemplate: "%s",
    title: "RealtimePay - Admin",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Bills Payment Made Easy.",
      },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "og:title",
        property: "og:title",
        content: "RealtimePay - Bills Payment Made Easy",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Bills Payment Made Easy.",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: `${process.env.LANDING_URL}/light-logo.jpg`,
      },
      { hid: "og:image:width", property: "og:image:width", content: "1200" },
      { hid: "og:image:height", property: "og:image:height", content: "630" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        hid: "shortcut-icon",
        rel: "shortcut icon",
        type: "image/png",
        href: "/icon.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "stylesheet",
        crossorigin: "anonymous",
        integrity:
          "sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
      },
    ],
    script: [
      {
        src: "/scripts/jquery-3.3.1.min.js",
        type: "text/javascript",
      },

      {
        src: "/scripts/easy.qrcode.js",
        type: "text/javascript",
        body: true,
        defer: true,
      },
      {
        src: "https://cdn.lordicon.com/lordicon.js",
        type: "text/javascript",
        crossorigin: "anonymous",
        body: true,
        defer: true,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js",
        type: "text/javascript",
        integrity:
          "sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN",
        crossorigin: "anonymous",
        body: true,
        defer: true,
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js",
        type: "text/javascript",
        body: true,
        defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/root.scss", "~/assets/main.scss", "~/assets/responsive.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/api.js",
    "~/plugins/helper.js",
    "~/plugins/bus.js",
    "~/plugins/toast.js",
    "~/plugins/currency.js",
    "~/plugins/datePicker.js",
    { src: "~/plugins/chart.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    //  https:/ / auth.nuxtjs.org /
    "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_API,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  env: {
    PORT: process.env.PORT,
    BASE_API: process.env.BASE_API,
    USER_URL: process.env.USER_URL,
    LANDING_URL: process.env.LANDING_URL,
  },

  // authentication strategies
  auth: {
    // rewriteRedirects: true,
    strategies: {
      local: {
        token: {
          property: "data.token",
          global: true,
          required: true,
          type: "Bearer",
          maxAge: 2592000,
        },
        user: {
          property: "data",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "sign-in", method: "post" },
          logout: { url: "sign-out", method: "get" },
          user: { url: "admin", method: "get", propertyName: "user" },
        },
      },
    },
    redirect: {
      login: "/auth/login", // User will be redirected to this path if login is required.
      logout: "/auth/login", // User will be redirected to this path if after logout, current route is protected.
      callback: false, // User will be redirected to this path by the identity provider after login.
      home: "/", // User will be redirected to this path after login.
    },
  },

  router: {
    middleware: ["auth"],
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BASE_API,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_API,
    },
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
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
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  loading: "~/components/LoadingSvg.vue",
};
