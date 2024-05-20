export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const projectId = validateId(event)

  const schema = z.object({
    name: z.string().min(1).optional(),
    repository: z.string().url().nullable().optional(),
    description: z.string().nullable().optional(),
    variables: z.string().optional().nullable(),
    commands: z.string().optional().nullable(),
  })

  const body = await validateBody(event, schema)

  const project = await event.context.prisma.project.update({
    where: {
      id: projectId,
      userId,
    },
    data: {
      name: body.name,
      description: body.description,
      repository: body.repository,
      commands: body.commands,
      variables: body.variables,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return project
})
