import { handleError } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await checkDevice(event);

    const mqtt = await event.context.prisma.mqtt.findUnique({
      where: {
        userId,
      },
      select: {
        uriTCP: true,
        uriWS: true,
        username: true,
        password: true,
      },
    });

    return mqtt;
  } catch (error) {
    await handleError(error);
  }
});
