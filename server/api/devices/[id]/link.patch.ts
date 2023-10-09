export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id
  const { projectId } = await readBody<Device>(event)

  const schema = z.object({
    id: z.string().regex(REGEX_UUID),
    projectId: z.string().regex(REGEX_UUID)
  })

  schema.parse({ id, projectId })

  const device = await event.context.prisma.device.update({
    where: {
      id
    },
    data: {
      project: {
        connect: {
          id: projectId || undefined
        }
      }
    }
  }).catch((e) => { throw createPrismaError(e) })

  return device
})
