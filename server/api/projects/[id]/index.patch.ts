export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const id = event.context.params?.id
  const { name, repository, description, variables, commands } = await readBody<Project>(event)

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
    name: z.string().min(1).optional(),
    repository: z.string().url().or(z.literal('')).nullable().optional(),
    description: z.string().nullable().optional(),
    variables: z.string().optional().nullable(),
    commands: z.string().optional().nullable(),
  })

  schema.parse({ id, name, repository, description, variables, commands })

  const project = await event.context.prisma.project.update({
    where: {
      id,
      userId,
    },
    data: {
      name,
      description,
      repository,
      commands,
      variables,
    },
  }).catch((e) => { throw createPrismaError(e) })

  return project
})
