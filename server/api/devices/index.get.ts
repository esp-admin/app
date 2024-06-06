export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const devices = await event.context.auth.adapter.source.device.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      projectId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return devices
})
