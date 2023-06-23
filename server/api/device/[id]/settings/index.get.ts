import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const device = await checkDevice(event);

    const mqtt = await prisma.mqtt.findUnique({
      where: {
        userId: device.userId,
      },
    });

    return mqtt;
  } catch (error) {
    await handleError(error);
  }
});
