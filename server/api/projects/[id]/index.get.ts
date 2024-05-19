export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
  })

  schema.parse({ id })

  const project = await event.context.prisma.project.findUniqueOrThrow({
    where: {
      id,
      userId,
    },
  }).catch((e) => { throw createPrismaError(e) })

  return project
})
