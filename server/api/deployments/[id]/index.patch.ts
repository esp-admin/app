export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const { status } = await readBody<Deployment>(event)

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
    status: z.enum(['started', 'failed', 'succeded'])
  })

  schema.parse({ id, status })

  const deployment = await event.context.prisma.deployment.update({
    where: {
      id
    },
    data: {
      status
    },
    select: {
      id: true
    }
  }).catch((e) => { throw createPrismaError(e) })

  return deployment
})
