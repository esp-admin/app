export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const projects = await event.context.prisma.project.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return projects
})
