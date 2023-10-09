export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id
  const data = await readBody<Partial<Project>>(event)

  const schema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
  })

  schema.parse({ id })

  const project = await event.context.prisma.project.update({
    where: {
      id
    },
    data
  }).catch((e) => { throw createPrismaError(e) })

  return project
})
