import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const { deviceId } = getQuery(event) as { deviceId: Device["id"] };

    if (!deviceId) {
      throw new Error("<deviceId> is required");
    }

    const deployments = await prisma.deployment.findMany({
      where: {
        deviceId,
      },
      include: {
        release: {
          select: {
            version: true,
            projectId: true,
          },
        },
      },
    });

    return deployments;
  } catch (error) {
    await handleError(error);
  }
});
