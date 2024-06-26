export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const mqtt = await event.context.auth.adapter.source.mqtt.findUnique({
    where: {
      userId,
    },
    select: {
      password: true,
      username: true,
      uriTCP: true,
      uriWS: true,
    },
  })

  return mqtt
})
