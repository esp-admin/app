export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const { name } = await readBody<Project>(event)

  const schema = z.object({
    name: z.string().min(1)
  })

  schema.parse({ name })

  const project = await event.context.prisma.project.create({
    data: {
      name,
      userId
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true
    }
  }).catch((e) => { throw createPrismaError(e) })

  return project
})
