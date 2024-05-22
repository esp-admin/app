export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const projectId = validateId(event)

  const schema = z.object({
    name: z.string().min(1).optional(),
    repository: z.string().url().nullable().optional(),
    description: z.string().nullable().optional(),
    variables: z.string().optional().nullable(),
    commands: z.string().optional().nullable(),
    apiKey: z.string().min(1).optional().nullable(),
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
      apiKey: body.apiKey,
    },
    select: {
      id: true,
      name: true,
      repository: true,
      description: true,
      commands: true,
      variables: true,
      createdAt: true,
      updatedAt: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return project
})
