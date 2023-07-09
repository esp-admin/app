import { auth, naiveui, tailwindcss, s3 } from "./config";

export default defineNuxtConfig({
  ssr: true,

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
          href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  css: ["~/assets/styles/main.css"],

  modules: [
    "@bg-dev/nuxt-auth",
    "@bg-dev/nuxt-naiveui",
    "@nuxtjs/tailwindcss",
    "@bg-dev/nuxt-s3",
    "nuxt-security",
    // "@nuxt/devtools",
  ],

  auth,
  naiveui,
  tailwindcss,
  s3,

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
          "https://avatars.githubusercontent.com",
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
    "/": {
      redirect: "/auth/login",
    },
  },

  runtimeConfig: {
    public: {
      oauth: {
        google: process.env.AUTH_OAUTH_GOOGLE_ENABLE === "true" ? true : false,
        github: process.env.AUTH_OAUTH_GITHUB_ENABLE === "true" ? true : false,
      },
      bugsnag: {
        enabled: process.env.BUGSNAG_ENABLE === "true" ? true : false,
        apiKey: process.env.BUGSNAG_API_KEY,
      },
    },
  },
});
