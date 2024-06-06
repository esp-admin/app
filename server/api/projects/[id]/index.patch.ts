import { hashSync } from '#auth_utils'

export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const projectId = validateId(event)

  const schema = z.object({
    name: z.string().min(1).optional(),
    repository: z.string().url().nullable().optional(),
    description: z.string().min(1).nullable().optional(),
    variables: z.string().min(1).nullable().optional(),
    commands: z.string().min(1).nullable().optional(),
    apiKey: z.string().min(1).nullable().optional(),
  })

  const body = await validateBody(event, schema)

  let hashedApiKey = undefined

  if (body.apiKey) {
    hashedApiKey = hashSync(body.apiKey, 12)
  }

  const project = await event.context.auth.adapter.source.project.update({
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
      apiKey: hashedApiKey,
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
