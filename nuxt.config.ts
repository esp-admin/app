import { auth, naiveui, tailwindcss, s3 } from "./config";

export default defineNuxtConfig({
  ssr: true,
  // experimental: {
  //   inlineSSRStyles: false,
  // },

  app: {
    head: {
      title: "ESP Admin",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: ["~/assets/styles/main.css"],

  modules: [
    "@bg-dev/nuxt-auth",
    "@bg-dev/nuxt-naiveui",
    "@nuxtjs/tailwindcss",
    "@bg-dev/nuxt-s3",
    "nuxt-security",
    //"nuxt-gtag",
    // "@nuxt/devtools",
  ],

  auth,
  naiveui,
  tailwindcss,
  s3,

  // gtag: {
  //   id: process.env.GTAG_MEASUREMENT_ID,
  // },

  security: {
    corsHandler: {
      origin: process.env.AUTH_BASE_URL,
      methods: "*",
    },
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "blob:",
          "https://*.googleusercontent.com",
          "https://ui-avatars.com",
          "https://www.googletagmanager.com",
          process.env.S3_PUBLIC_BUCKET_URL || "",
        ],
      },
    },
  },

  routeRules: {
    "api/s3/object/create": {
      security: {
        xssValidator: false,
      },
    },
  },

  runtimeConfig: {
    public: {
      bugsnag: {
        enabled: false,
        apiKey: process.env.BUGSNAG_API_KEY,
      },
    },
  },
});
