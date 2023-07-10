import type { ModuleOptions } from "@bg-dev/nuxt-auth";

export const auth: Partial<ModuleOptions> = {
  baseUrl: process.env.AUTH_BASE_URL,

  accessToken: {
    jwtSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || "",
  },

  refreshToken: {
    jwtSecret: process.env.AUTH_REFRESH_TOKEN_SECRET || "",
  },

  oauth: {
    google: {
      clientId: process.env.AUTH_OAUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_OAUTH_GOOGLE_CLIENT_SECRET || "",
      scopes: "email profile",
      authorizeUrl: "https://accounts.google.com/o/oauth2/auth",
      tokenUrl: "https://accounts.google.com/o/oauth2/token",
      userUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    },

    github: {
      clientId: process.env.AUTH_OAUTH_GITHUB_CLIENT_ID || "",
      clientSecret: process.env.AUTH_OAUTH_GITHUB_CLIENT_SECRET || "",
      scopes: "user:email",
      authorizeUrl: "https://github.com/login/oauth/authorize",
      tokenUrl: "https://github.com/login/oauth/access_token",
      userUrl: "https://api.github.com/user",
    },
  },

  redirect: {
    login: "/auth/login",
    logout: "/auth/login",
    home: "/home",
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

  smtp: {
    host: process.env.AUTH_SMTP_HOST || "",
    port:
      (process.env.AUTH_SMTP_PORT && parseInt(process.env.AUTH_SMTP_PORT)) ||
      587,
    user: process.env.AUTH_SMTP_USER || "",
    pass: process.env.AUTH_SMTP_PASS || "",
    from: process.env.AUTH_SMTP_FROM || "",
  },

  emailTemplates: {
    emailVerify: `
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        body {
            background-color: #f1f5f9;
            color: #0f172a;
            font-family: "Arial";
            padding: 8px;
        }

        a {
            cursor: pointer;
            display: block;
            text-align: center;
            color: #4438cac5;
            margin: 8px;
        }

        header {
            text-align: center;
            padding: 8px;
            background-color: rgba(0, 0, 255, 0.295);
        }
    </style>
  </head>

  <body>
    <header>
        <h3>ESP Admin</h3>
    </header>

    <h3>Hello {{name}},</h3>
    <p>
        We have received a request to verify your email address. If you haven't
        made this request please ignore the following email.
    </p>
    <p>
        Otherwise, to complete the process, click the following link.
    </p>
    <a href="{{link}}">Verify your email</a>
    <b>Important, this link will expire in {{validityInMinutes}} minutes.</b>
    <p>Thank you, and have a good day.</p>
  </body>

  </html>
    `,
    passwordReset: `
  <html lang="en">

  <head>
    <style>
        body {
            background-color: #f1f5f9;
            color: #0f172a;
            font-family: "Arial";
            padding: 8px;
        }

        a {
            cursor: pointer;
            display: block;
            text-align: center;
            color: #4338ca;
            margin: 24px;
        }


        header {
            text-align: center;
            padding: 8px;
            background-color: rgba(0, 0, 255, 0.295);
        }
    </style>
  </head>

  <body>
    <header>
        <h3>ESP Admin</h3>
    </header>

    <h3>Hello {{name}},</h3>
    <p>
        We have received a request to reset your password. If you haven't
        made this request please ignore the following email.
    </p>
    <p>
        Otherwise, to complete the process, click the following link.
    </p>
    <a href="{{link}}">Reset your password</a>
    <b>Important, this link will expire in {{validityInMinutes}} minutes.</b>
    <p>Thank you, and have a good day.</p>
  </body>

  </html>
    `,
  },
};
