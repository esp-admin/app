export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const deviceId = validateId(event)

  const device = await event.context.prisma.device.update({
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
  }).catch((e) => { throw createPrismaError(e) })

  return device
})
