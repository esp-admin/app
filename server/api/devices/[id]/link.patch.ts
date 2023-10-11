export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const id = event.context.params?.id
  const { projectId } = await readBody<Device>(event)

  const schema = z.object({
    id: z.string().regex(REGEX_ID),
    projectId: z.string().regex(REGEX_ID)
  })

  schema.parse({ id, projectId })

  const device = await event.context.prisma.device.update({
    where: {
      id,
      userId
    },
    select: {
      id: true
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
