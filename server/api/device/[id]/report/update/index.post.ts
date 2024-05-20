export default defineEventHandler(async (event) => {
  const { id: deviceId } = await checkDevice(event)

  const schema = z.object({
    status: z.enum(['started', 'failed', 'succeded']),
    releaseId: z.string().regex(REGEX_ID).optional(),
    deploymentId: z.string().regex(REGEX_ID).optional(),
  })

  const body = await validateBody(event, schema)

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
