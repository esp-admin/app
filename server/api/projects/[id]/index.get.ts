export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/)
  })

  schema.parse({ id })

  const project = await event.context.prisma.project.findUnique({
    where: {
      id
    }
  })

  return project
})
