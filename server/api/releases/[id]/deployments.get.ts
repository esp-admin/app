export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
  })

  schema.parse({ id })

  const deployments = await event.context.prisma.deployment.findMany({
    where: {
      releaseId: id,
    },
    select: {
      status: true,
      deviceId: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  }).catch((e) => { throw createPrismaError(e) })

  return deployments
})
