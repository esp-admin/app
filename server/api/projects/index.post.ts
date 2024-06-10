export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    name: z.string().min(1),
  })

  const body = await validateBody(event, schema)

  const project = await event.context.auth.adapter.source.project.create({
    data: {
      name: body.name,
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return project
})
