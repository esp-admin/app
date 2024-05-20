export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const deviceId = validateId(event)

  const schema = z.object({
    projectId: z.string().regex(REGEX_ID),
  })

  const body = await validateBody(event, schema)

  const device = await event.context.prisma.device.update({
    where: {
      id: deviceId,
      userId,
    },
    select: {
      id: true,
    },
    data: {
      project: {
        connect: {
          id: body.projectId,
        },
      },
    },
  }).catch((e) => { throw createPrismaError(e) })

  return device
})
