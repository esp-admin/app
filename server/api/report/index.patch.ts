export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    webhookEnable: z.boolean().optional(),
    emailEnable: z.boolean().optional(),
    webhookUrl: z.string().url().nullable().optional(),
    emailAddress: z.string().email().nullable().optional(),
  })

  const body = await validateBody(event, schema)

  const report = await event.context.prisma.report.update({
    where: {
      userId,
    },
    data: {
      webhookEnable: body.webhookEnable,
      webhookUrl: body.webhookUrl,
      emailAddress: body.emailAddress,
      emailEnable: body.emailEnable,
    },
    select: {
      emailAddress: true,
      emailEnable: true,
      webhookEnable: true,
      webhookUrl: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return report
})
