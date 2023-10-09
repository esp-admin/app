export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const mqtt = await event.context.prisma.mqtt.findUniqueOrThrow({
    where: {
      userId
    }
  })

  return mqtt
})
