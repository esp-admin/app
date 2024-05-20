export default defineEventHandler(async (event) => {
  checkUser(event)

  const deploymentId = validateId(event)

  const schema = z.object({
    status: z.enum(['started', 'failed', 'succeded']).optional(),
  })

  const body = await validateBody(event, schema)

  const deployment = await event.context.prisma.deployment.update({
    where: {
      id: deploymentId,
    },
    data: {
      status: body.status,
    },
    select: {
      id: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return deployment
})
