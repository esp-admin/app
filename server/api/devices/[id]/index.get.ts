/* eslint-disable @typescript-eslint/no-unused-vars */

export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID)
  })

  schema.parse({ id })

  const device = await event.context.prisma.device.findUniqueOrThrow({
    where: {
      id
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

  // @ts-ignore
  const { apiKey, ...sanitizedDevice } = device

  return sanitizedDevice
})
