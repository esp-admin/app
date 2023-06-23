import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const { deviceId } = getQuery(event) as { deviceId: Device["id"] };

    if (!deviceId) {
      throw new Error("<deviceId> is required");
    }

    const deployments = await prisma.deployment.findMany({
      where: {
        deviceId,
      },
    });

    return deployments;
  } catch (error) {
    await handleError(error);
  }
});
