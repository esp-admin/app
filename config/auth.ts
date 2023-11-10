import type { ModuleOptions } from '@bg-dev/nuxt-auth'

export const auth: Partial<ModuleOptions> = {
  baseUrl: 'http://localhost:3000',

  accessToken: {
    jwtSecret: '*'
  },

  refreshToken: {
    jwtSecret: '*'
  },

  oauth: {
    google: {
      clientId: '',
      clientSecret: '',
      scopes: 'email profile',
      authorizeUrl: 'https://accounts.google.com/o/oauth2/auth',
      tokenUrl: 'https://accounts.google.com/o/oauth2/token',
      userUrl: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },

    github: {
      clientId: '',
      clientSecret: '',
      scopes: 'user:email',
      authorizeUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      userUrl: 'https://api.github.com/user'
    }
  },

  redirect: {
    login: '/auth/login',
    logout: '/auth/login',
    home: '/',
    callback: '/auth/callback',
    emailVerify: '/auth/verify-email',
    passwordReset: '/auth/reset-password'
  },

  enableGlobalAuthMiddleware: true,

  registration: {
    enable: true,
    requireEmailVerification: true,
    defaultRole: 'user'
  },

  email: {
    from: '',
    provider: {
      name: 'sendgrid',
      apiKey: ''
    },
    templates: {
      emailVerify:
        `
        <!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>@font-face{font-family:Inter;font-style:normal;font-weight:400;mso-font-alt:Verdana;src:url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2')}*{font-family:Inter,Verdana}</style><style>blockquote,h1,h2,h3,img,li,ol,p,ul{margin-top:0;margin-bottom:0}</style></head><body><table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin-left:auto;margin-right:auto;padding:.5rem"><tbody><tr style="width:100%"><td><img alt="" src="https://f005.backblazeb2.com/file/bg-personal-bucket/favicon.ico" style="display: block;outline: none;border: none;text-decoration: none;margin-bottom: 32px;margin-top: 0px;height: 48px;"><h3 style="font-size: 24px;font-weight: 600;line-height: 38px;margin-bottom: 12px;color: rgb(17, 24, 39);text-align: left;">Hello {{name}}</h3><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">We have received a request to verify your email address. If you haven't made this request please ignore the following email. Otherwise, to complete the process, click the following link.</p><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:0px;margin-bottom:20px;text-align:left;"><tbody><tr><td><a href="{{link}}" style="border: 2px solid;line-height: 1.25rem;text-decoration: none;display: inline-block;max-width: 100%;font-size: 0.875rem;font-weight: 500;text-decoration-line: none;color: rgb(255, 255, 255);background-color: #e80000;border-color: #e80000;padding: 12px 34px;border-radius: 9999px;">
        <span></span>
        <span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">
        Verify email</span>
        <span></span>
        </a></td></tr></tbody></table><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;"><strong>This link will expire in {{validityInMinutes}} minutes.</strong></p><hr style="width: 100%;border: none;border-top: 1px solid #eaeaea;margin-top: 32px;margin-bottom: 32px;"><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">From <strong><a href="https://esp-admin.tn" target="_blank" style="font-weight: 500;color: rgb(17, 24, 39);text-decoration-line: underline;">ESP Admin</a></strong></p></td></tr></tbody></table></body></html>
        `,
      passwordReset:
        `
        <!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>@font-face{font-family:Inter;font-style:normal;font-weight:400;mso-font-alt:Verdana;src:url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2')}*{font-family:Inter,Verdana}</style><style>blockquote,h1,h2,h3,img,li,ol,p,ul{margin-top:0;margin-bottom:0}</style></head><body><table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin-left:auto;margin-right:auto;padding:.5rem"><tbody><tr style="width:100%"><td><img alt="" src="https://public-assets.netlify.app/esp-admin/favicon.ico" style="display: block;outline: none;border: none;text-decoration: none;margin-bottom: 32px;margin-top: 0px;height: 48px;"><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">Hello {{name}},</p><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">We have received a request to reset your password. If you haven't made this request please ignore the following email. Otherwise, to complete the process, click the following link.</p><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:0px;margin-bottom:20px;text-align:left;"><tbody><tr><td><a href="{{link}}" style="border: 2px solid;line-height: 1.25rem;text-decoration: none;display: inline-block;max-width: 100%;font-size: 0.875rem;font-weight: 500;text-decoration-line: none;color: #da0000;background-color: transparent;border-color: #da0000;padding: 10px 34px;border-radius: 9999px;">
        <span></span>
        <span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">
        Reset password</span>
        <span></span>
        </a></td></tr></tbody></table><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">This link will expire in {{validityInMinutes}} minutes.</p><hr style="width: 100%;border: none;border-top: 1px solid #eaeaea;margin-top: 32px;margin-bottom: 32px;"><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">From <strong><a href="https://esp-admin.bg.tn/" target="_blank" style="font-weight: 500;color: rgb(17, 24, 39);text-decoration-line: underline;">ESP Admin</a></strong></p></td></tr></tbody></table></body></html>
      `
    }
  }
}
