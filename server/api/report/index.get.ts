export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const report = await event.context.prisma.report.findUniqueOrThrow({
    where: {
      userId
    }
  }).catch((e) => { throw createPrismaError(e) })

  return report
})
