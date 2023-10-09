export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const { status } = await readBody<Deployment>(event)

  const schema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/),
    status: z.string().min(1)
  })

  schema.parse({ id, status })

  const deployment = await event.context.prisma.deployment.update({
    where: {
      id
    },
    data: {
      status
    }
  }).catch((e) => { throw createPrismaError(e) })

  return deployment
})
