export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const { webhookEnable, emailEnable, emailAddress, webhookUrl }
      = await readBody<Report>(event)

  const schema = z.object({
    webhookEnable: z.boolean(),
    emailEnable: z.boolean(),
    webhookUrl: z.string().url().or(z.literal('')).nullable().optional(),
    emailAddress: z.string().email().or(z.literal('')).nullable().optional(),
  })

  schema.parse({ webhookEnable, emailEnable, webhookUrl, emailAddress })

  const report = await event.context.prisma.report.update({
    where: {
      userId,
    },
    data: {
      webhookEnable,
      webhookUrl,
      emailAddress,
      emailEnable,
    },
    select: {
      emailAddress: true,
      emailEnable: true,
      webhookEnable: true,
      webhookUrl: true,
    },
  }).catch((e) => { throw createPrismaError(e) })

  return report
})
