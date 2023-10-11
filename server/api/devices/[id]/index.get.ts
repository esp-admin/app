export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID)
  })

  schema.parse({ id })

  const device = await event.context.prisma.device.findUniqueOrThrow({
    where: {
      id,
      userId
    },
    include: {
      project: {
        select: {
          name: true,
          id: true
        }
      },
      deployments: {
        select: {
          status: true,
          updatedAt: true
        }
      }
    }
  }).catch((e) => { throw createPrismaError(e) })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { apiKey, ...sanitized } = device

  return sanitized
})
