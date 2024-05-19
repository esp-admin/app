export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
  })

  schema.parse({ id })

  const deployments = await event.context.prisma.deployment.findMany({
    where: {
      deviceId: id,
    },
    include: {
      release: {
        select: {
          version: true,
          projectId: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return deployments
})
