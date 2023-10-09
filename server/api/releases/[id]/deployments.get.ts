export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
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
