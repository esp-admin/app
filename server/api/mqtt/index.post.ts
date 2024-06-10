export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    uriTCP: z.string().url().nullable().optional(),
    uriWS: z.string().url(),
    username: z.string().min(1),
    password: z.string().min(1),
  })

  const body = await validateBody(event, schema)

  const mqtt = await event.context.auth.adapter.source.mqtt.create({
    data: {
      uriTCP: body.uriTCP,
      uriWS: body.uriWS,
      username: body.username,
      password: body.password,
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
