import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const devices = await prisma.device.findMany({
      where: {
        userId,
      },
    });

    return devices;
  } catch (error) {
    await handleError(error);
  }
});
