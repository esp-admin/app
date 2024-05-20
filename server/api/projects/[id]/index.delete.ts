export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const projectId = validateId(event)

  const project = await event.context.prisma.project.delete({
    where: {
      id: projectId,
      userId,
    },
    select: {
      id: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return project
})
