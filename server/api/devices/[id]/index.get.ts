/* eslint-disable @typescript-eslint/no-unused-vars */

export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
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
