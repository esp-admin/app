export default defineEventHandler(async (event) => {
  checkUser(event)

  const deploymentId = validateId(event)

  const deployment = await event.context.auth.adapter.source.deployment.delete({
    where: {
      id: deploymentId,
    },
    select: {
      id: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return deployment
})
