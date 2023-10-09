/* eslint-disable @typescript-eslint/no-unused-vars */

export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_UUID)
  })

  schema.parse({ id })

  const device = await event.context.prisma.device.findUnique({
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
  })

  // @ts-ignore
  const { apiKey, ...sanitizedDevice } = device

  return sanitizedDevice
})
