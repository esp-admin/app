export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_UUID)
  })

  schema.parse({ id })

  const deployments = await event.context.prisma.deployment.findMany({
    where: {
      releaseId: id
    },
    select: {
      status: true,
      deviceId: true
    }
  }).catch((e) => { throw createPrismaError(e) })

  return deployments
})
