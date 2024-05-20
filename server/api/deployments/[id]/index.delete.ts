export default defineEventHandler(async (event) => {
  checkUser(event)

  const deploymentId = validateId(event)

  const deployment = await event.context.prisma.deployment.delete({
    where: {
      id: deploymentId,
    },
    select: {
      id: true,
    },
  }).catch((e) => { throw createPrismaError(e) })

  return deployment
})
