import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const { name, apiKey } = await readBody<Device>(event);

    const device = await prisma.device.create({
      data: {
        name,
        userId,
        apiKey,
      },
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
