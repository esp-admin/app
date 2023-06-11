import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const id = event.context.params?.id;

    const device = await prisma.device.findUnique({
      where: {
        id,
      },
    });

    return device;
  } catch (error) {
    handleError(error);
  }
});
