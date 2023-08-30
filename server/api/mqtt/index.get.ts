import { handleError } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const mqtt = await event.context.prisma.mqtt.findUnique({
      where: {
        userId,
      },
    });

    return mqtt;
  } catch (error) {
    await handleError(error);
  }
});
