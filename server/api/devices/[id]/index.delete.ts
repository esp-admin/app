export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const deviceId = validateId(event)

  const device = await event.context.auth.adapter.source.device.delete({
    where: {
      id: deviceId,
      userId,
    },
    select: {
      id: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return device
})
