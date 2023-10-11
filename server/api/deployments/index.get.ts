export default defineEventHandler(async (event) => {
  checkUser(event)

  const { deviceId } = getQuery<{ deviceId: Device['id'] }>(event)

  const schema = z.object({
    deviceId: z.string().regex(REGEX_ID)
  })

  schema.parse({ deviceId })

  const deployments = await event.context.prisma.deployment.findMany({
    where: {
      deviceId
    },
    include: {
      release: {
        select: {
          version: true,
          projectId: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return deployments
})
