export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const report = await event.context.prisma.report.findUniqueOrThrow({
    where: {
      userId
    }
  })

  return report
})
