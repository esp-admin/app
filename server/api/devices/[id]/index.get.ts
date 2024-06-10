export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const deviceId = validateId(event)

  const device = await event.context.auth.adapter.source.device.findUniqueOrThrow({
    where: {
      id: deviceId,
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      projectId: true,
      createdAt: true,
      variables: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return device
})
