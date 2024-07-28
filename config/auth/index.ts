import type { ModuleOptions } from '@bg-dev/nuxt-auth'

export const auth: Partial<ModuleOptions> = {
  baseUrl: 'http://localhost:3000',

  accessToken: {
    jwtSecret: '*',
  },

  refreshToken: {
    jwtSecret: '*',
  },

  oauth: {
    google: {
      clientId: '*',
      clientSecret: '*',
      scopes: 'email profile',
      authorizeUrl: 'https://accounts.google.com/o/oauth2/auth',
      tokenUrl: 'https://accounts.google.com/o/oauth2/token',
      userUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },

    github: {
      clientId: '*',
      clientSecret: '*',
      scopes: 'user:email',
      authorizeUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      userUrl: 'https://api.github.com/user',
    },
  },

  redirect: {
    login: '/auth/login',
    logout: '/auth/login',
    home: '/',
    callback: '/auth/callback',
    emailVerify: '/auth/verify-email',
    passwordReset: '/auth/reset-password',
  },

  enableGlobalAuthMiddleware: true,

  registration: {
    enabled: true,
    requireEmailVerification: true,
    defaultRole: 'user',
  },

  email: {
    from: '*',
    provider: {
      name: 'sendgrid',
      apiKey: '*',
    },
    templates: {
      emailVerify: '../config/auth/email-verify.html',
      passwordReset: '../config/auth/password-reset.html',
    },
  },
}
