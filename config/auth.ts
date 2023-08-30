import type { ModuleOptions } from "@bg-dev/nuxt-auth";

export const auth: Partial<ModuleOptions> = {
  baseUrl: process.env.AUTH_BASE_URL,

  accessToken: {
    jwtSecret: process.env.AUTH_ACCESS_TOKEN_SECRET!,
  },

  refreshToken: {
    jwtSecret: process.env.AUTH_REFRESH_TOKEN_SECRET!,
  },

  oauth: {
    google: {
      clientId: process.env.AUTH_OAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_OAUTH_GOOGLE_CLIENT_SECRET!,
      scopes: "email profile",
      authorizeUrl: "https://accounts.google.com/o/oauth2/auth",
      tokenUrl: "https://accounts.google.com/o/oauth2/token",
      userUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    },

    github: {
      clientId: process.env.AUTH_OAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_OAUTH_GITHUB_CLIENT_SECRET!,
      scopes: "user:email",
      authorizeUrl: "https://github.com/login/oauth/authorize",
      tokenUrl: "https://github.com/login/oauth/access_token",
      userUrl: "https://api.github.com/user",
    },
  },

  redirect: {
    login: "/auth/login",
    logout: "/auth/login",
    home: "/",
    callback: "/auth/callback",
    emailVerify: "/auth/verify-email",
    passwordReset: "/auth/reset-password",
  },

  enableGlobalAuthMiddleware: true,

  registration: {
    enable: process.env.AUTH_REGISTRATION_ENABLE === "false" ? false : true,
    requireEmailVerification: true,
    defaultRole: "user",
  },

  email: {
    from: process.env.AUTH_EMAIL_FROM!,
    provider: {
      name: "sendgrid",
      apiKey: process.env.AUTH_EMAIL_SENDGRID_API_KEY!,
    },
  },
};
