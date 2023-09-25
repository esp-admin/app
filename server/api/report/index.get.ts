export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const report = await event.context.prisma.report.findUnique({
    where: {
      userId
    }
  })

  return report
})
