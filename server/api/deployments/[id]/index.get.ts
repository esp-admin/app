export default defineEventHandler(async (event) => {
  checkUser(event)

  const deploymentId = validateId(event)

  const deployment = await event.context.prisma.deployment.findUniqueOrThrow({
    where: {
      id: deploymentId,
    },
    include: {
      release: {
        select: {
          version: true,
          projectId: true,
        },
      },
    },
  }).catch((e) => { throw createPrismaError(e) })

  return deployment
})
