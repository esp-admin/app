export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    uriTCP: z.string().url().nullable().optional(),
    uriWS: z.string().url().optional(),
    username: z.string().min(1).optional(),
    password: z.string().min(1).optional(),
  })

  const body = await validateBody(event, schema)

  const mqtt = await event.context.auth.adapter.source.mqtt.update({
    where: {
      userId,
    },
    data: {
      uriTCP: body.uriTCP,
      uriWS: body.uriWS,
      username: body.username,
      password: body.password,
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
