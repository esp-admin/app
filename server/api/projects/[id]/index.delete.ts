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
  }).catch((e) => { throw createPrismaError(e) })

  return project
})
