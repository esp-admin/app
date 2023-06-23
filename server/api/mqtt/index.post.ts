import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const data = await readBody<Mqtt>(event);

    const mqtt = await prisma.mqtt.create({
      data: {
        ...data,
        userId,
      },
    });

    return mqtt;
  } catch (error) {
    await handleError(error);
  }
});
