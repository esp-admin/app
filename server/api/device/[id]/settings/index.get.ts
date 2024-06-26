export default defineEventHandler(async (event) => {
  const { userId } = await checkDevice(event)

  const mqtt = await event.context.auth.adapter.source.mqtt.findUniqueOrThrow({
    where: {
      userId,
    },
    select: {
      uriTCP: true,
      uriWS: true,
      username: true,
      password: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return mqtt
})
