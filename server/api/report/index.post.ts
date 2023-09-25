import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const { webhookEnable, emailEnable, emailAddress, webhookUrl } =
      await readBody<Report>(event)

  const schema = z.object({
    webhookEnable: z.boolean(),
    emailEnable: z.boolean(),
    webhookUrl: z.string().url().or(z.literal('')),
    emailAddress: z.string().email().or(z.literal(''))
  })

  schema.parse({ webhookEnable, emailEnable, webhookUrl, emailAddress })

  const report = await event.context.prisma.report.create({
    data: {
      webhookEnable,
      webhookUrl,
      emailAddress,
      emailEnable,
      userId
    }
  }).catch((e) => { throw createPrismaError(e) })

  return report
})
