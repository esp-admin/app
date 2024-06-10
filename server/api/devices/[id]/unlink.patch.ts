export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const deviceId = validateId(event)

  const device = await event.context.auth.adapter.source.device.update({
    where: {
      id: deviceId,
      userId,
    },
    select: {
      id: true,
    },
    data: {
      project: {
        disconnect: true,
      },
    },
  }).catch((err) => { throw createPrismaError(err) })

  return device
})
