export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    webhookEnable: z.boolean(),
    emailEnable: z.boolean(),
    webhookUrl: z.string().url().nullable().optional(),
    emailAddress: z.string().email().nullable().optional(),
  })

  const body = await validateBody(event, schema)

  const report = await event.context.prisma.report.create({
    data: {
      webhookEnable: body.webhookEnable,
      webhookUrl: body.webhookUrl,
      emailAddress: body.emailAddress,
      emailEnable: body.emailEnable,
      userId,
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
