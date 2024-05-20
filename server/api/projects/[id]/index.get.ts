export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const projectId = validateId(event)

  const project = await event.context.prisma.project.findUniqueOrThrow({
    where: {
      id: projectId,
      userId,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return project
})
