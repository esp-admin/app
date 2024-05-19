import Mustache from 'mustache'
import { joinURL } from 'ufo'
import { sendMail } from '#auth'

export default defineEventHandler(async (event) => {
  const reportTemplate = `
<!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>@font-face{font-family:Inter;font-style:normal;font-weight:400;mso-font-alt:Verdana;src:url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2')}*{font-family:Inter,Verdana}</style><style>blockquote,h1,h2,h3,img,li,ol,p,ul{margin-top:0;margin-bottom:0}</style></head><body><table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin-left:auto;margin-right:auto;padding:.5rem"><tbody><tr style="width:100%"><td><img alt="" src="https://public-assets.netlify.app/esp-admin/favicon.ico" style="display: block;outline: none;border: none;text-decoration: none;margin-bottom: 32px;margin-top: 0px;height: 48px;"><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">Hello,</p><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">We have received <strong>{{type}}</strong> custom report message from <a href="{{deviceUrl}}" target="_blank" style="font-weight: 500;color: rgb(17, 24, 39);text-decoration-line: underline;">{{deviceName}}</a> with the following payload</p><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;"><em>{{body}}</em></p><hr style="width: 100%;border: none;border-top: 1px solid #eaeaea;margin-top: 32px;margin-bottom: 32px;"><p style="font-size: 15px;line-height: 24px;margin: 16px 0;margin-top: 0px;margin-bottom: 20px;color: rgb(55, 65, 81);-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: left;">From <strong><a href="https://esp-admin.tn" target="_blank" style="font-weight: 500;color: rgb(17, 24, 39);text-decoration-line: underline;">ESP Admin</a></strong></p></td></tr></tbody></table></body></html>
  `
  const { userId, projectId, id: deviceId, name: deviceName } = await checkDevice(event)

  const message = await readBody<ReportCustomMessage>(event)

  const schema = z.object({
    type: z.enum(['info', 'error', 'warn', 'success']),
    subject: z.string().min(1),
    body: z.string().min(1),
  })

  schema.parse(message)

  const report = await event.context.prisma.report.findUniqueOrThrow({
    where: {
      userId,
    },
    select: {
      emailAddress: true,
      emailEnable: true,
      webhookEnable: true,
      webhookUrl: true,
    },
  }).catch((e) => { throw createPrismaError(e) })

  const config = useRuntimeConfig()
  const baseUrl = config.public.auth.baseUrl
  const deviceUrl = joinURL(baseUrl, 'devices', deviceId)

  if (report.emailEnable && report.emailAddress) {
    await sendMail({
      subject: `${message.type} | ${message.subject}`,
      to: report.emailAddress,
      html: Mustache.render(reportTemplate, {
        type: message.type,
        body: message.body,
        deviceName,
        deviceUrl,
      }),
    })
  }

  if (report.webhookEnable && report.webhookUrl) {
    await $fetch(report.webhookUrl, {
      method: 'POST',
      body: {
        type: message.type,
        subject: message.subject,
        body: message.body,
        deviceId,
        projectId,
      },
    })
  }

  return 'ok'
})
