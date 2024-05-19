export default defineEventHandler(async (event) => {
  const { id: deviceId } = await checkDevice(event)

  const body = await readBody<ReportUpdateMessage>(event)

  const schema = z.object({
    status: z.enum(['started', 'failed', 'succeded']),
  })

  schema.parse({ status: body.status })

  if (body.status === 'started') {
    const deployment = await event.context.prisma.deployment.create({
      data: {
        device: {
          connect: {
            id: deviceId,
          },
        },
        release: {
          connect: {
            id: body.releaseId,
          },
        },
      },
      select: {
        id: true,
      },
    }).catch((e) => { throw createPrismaError(e) })

    return deployment.id
  }

  const deployment = await event.context.prisma.deployment.update({
    where: {
      id: body.deploymentId,
    },
    data: {
      status: body.status,
    },
    select: {
      id: true,
    },
  }).catch((e) => { throw createPrismaError(e) })

  return deployment.id
})
