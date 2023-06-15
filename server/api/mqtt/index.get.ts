import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const mqtt = await prisma.mqtt.findUnique({
      where: {
        userId,
      },
    });

    return mqtt;
  } catch (error) {
    await handleError(error);
  }
});
