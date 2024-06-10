export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const projectId = validateId(event)

  const project = await event.context.auth.adapter.source.project.findUniqueOrThrow({
    where: {
      id: projectId,
      userId,
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
