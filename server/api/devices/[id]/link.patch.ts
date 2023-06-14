import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const { projectId } = await readBody<Device>(event);

    const id = event.context.params?.id;

    const device = await prisma.device.update({
      where: {
        id,
      },
      data: {
        project: {
          connect: {
            id: projectId || undefined,
          },
        },
      },
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
