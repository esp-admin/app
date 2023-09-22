import { handleError } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event)

    const devices = await event.context.prisma.device.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        projectId: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return devices
  } catch (error) {
    await handleError(error)
  }
})
