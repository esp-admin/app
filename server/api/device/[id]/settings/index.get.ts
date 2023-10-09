export default defineEventHandler(async (event) => {
  const { userId } = await checkDevice(event)

  const mqtt = await event.context.prisma.mqtt.findUniqueOrThrow({
    where: {
      userId
    },
    select: {
      uriTCP: true,
      uriWS: true,
      username: true,
      password: true
    }
  })

  return mqtt
})
