export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const report = await event.context.auth.adapter.source.report.findUnique({
    where: {
      userId,
    },
    select: {
      emailAddress: true,
      emailEnable: true,
      webhookEnable: true,
      webhookUrl: true,
    },
  })

  return report
})
