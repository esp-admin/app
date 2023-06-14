import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const { name, mac, apiKey } = await readBody<Device>(event);

    const device = await prisma.device.create({
      data: {
        name,
        userId,
        mac,
        apiKey,
      },
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
