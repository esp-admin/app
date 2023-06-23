import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

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
