import mqtt from 'mqtt'
import { consola } from 'consola'

export default defineEventHandler(async (event) => {
  const schema = z.object({
    version: z.string().regex(REGEX_VERSION),
    projectId: z.string().regex(REGEX_ID),
    file: multipartSchema,
  })

  const multipart = await validateMultipartFormData(event, schema)

  let userId = ''

  const query = getQuery<{ ci: string }>(event)

  if (query.ci === 'true') {
    const project = await checkProject(event, multipart.projectId)
    userId = project.userId
  }
  else {
    userId = checkUser(event).userId
  }

  const downloadPath = await uploadObject(multipart.file, userId)

  const [release, mqttSettings] = await event.context.auth.adapter.source.$transaction([
    event.context.auth.adapter.source.release.create({
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
    }),
    event.context.auth.adapter.source.mqtt.findUnique({
      where: {
        userId,
      },
      select: {
        password: true,
        username: true,
        uriTCP: true,
        uriWS: true,
      },
    }),
  ]).catch((err) => { throw createPrismaError(err) })

  let published = false

  if (mqttSettings) {
    const uri = mqttSettings.uriTCP ?? mqttSettings.uriWS

    await mqtt.connectAsync(uri, {
      username: mqttSettings.username,
      password: mqttSettings.password,
    })
      .then(async (client) => {
        const linkedDevices = await event.context.auth.adapter.source.device.findMany({
          where: {
            projectId: multipart.projectId,
          },
          select: {
            id: true,
          },
        })

        const message = JSON.stringify({
          releaseId: release.id,
          version: release.version,
          downloadPath: release.downloadPath,
          downloadSize: multipart.file.data.byteLength,
        })

        await Promise.all(linkedDevices.map((device) => {
          const topic = `device/${device.id}/command/update`

          return client.publishAsync(topic, message, {
            retain: true,
            qos: 1,
          })
        }))

        published = true

        await client.endAsync(true)
      })
      .catch((err) => {
        consola.error(err)
      })
  }

  return { ...release, published }
})
