import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const id = event.context.params?.id;

    const device = await prisma.device.delete({
      where: {
        id,
      },
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
