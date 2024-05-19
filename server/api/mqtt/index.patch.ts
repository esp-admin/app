export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const { uriTCP, uriWS, username, password } = await readBody<Mqtt>(event)

  const schema = z.object({
    uriTCP: z.string().url().or(z.literal('')).nullable().optional(),
    uriWS: z.string().url(),
    username: z.string().min(1),
    password: z.string().min(1),
  })

  schema.parse({ uriTCP, uriWS, username, password })

  const mqtt = await event.context.prisma.mqtt.update({
    where: {
      userId,
    },
    data: {
      uriTCP,
      uriWS,
      username,
      password,
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
