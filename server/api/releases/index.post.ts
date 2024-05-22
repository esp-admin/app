import mqtt from 'mqtt'

export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    version: z.string().regex(REGEX_VERSION),
    projectId: z.string().regex(REGEX_ID),
    file: multipartSchema,
  })

  const multipart = await validateMultipartFormData(event, schema)

  const downloadPath = await uploadObject(event, multipart.file)

  const release = await event.context.prisma.release.create({
    data: {
      version: multipart.version,
      downloadPath,
      project: {
        connect: {
          id: multipart.projectId,
        },
      },
    },
    select: {
      id: true,
      version: true,
      downloadPath: true,
      createdAt: true,
      projectId: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  const mqttSettings = await event.context.prisma.mqtt.findUnique({
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

  if (mqttSettings) {
    const uri = mqttSettings.uriTCP ?? mqttSettings.uriWS

    await mqtt.connectAsync(uri, {
      username: mqttSettings.username,
      password: mqttSettings.password,
    })
      .then(async (client) => {
        const linkedDevices = await event.context.prisma.device.findMany({
          where: {
            projectId: multipart.projectId,
          },
          select: {
            id: true,
          },
        })

        await Promise.all(linkedDevices.map((device) => {
          const topic = `device/${device.id}/command/update`

          const message = JSON.stringify({
            releaseId: release.id,
            version: release.version,
            downloadPath: release.downloadPath,
          })

          return client.publishAsync(topic, message, {
            retain: true,
            qos: 1,
          })
        }))

        await client.endAsync(true)
      })
      .catch(() => { })
  }

  return release
})
