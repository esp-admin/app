import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const devices = await prisma.device.findMany({
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
      },
    });

    return devices;
  } catch (error) {
    await handleError(error);
  }
});
