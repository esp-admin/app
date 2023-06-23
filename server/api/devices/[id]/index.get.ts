import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const id = event.context.params?.id;

    const device = await prisma.device.findUnique({
      where: {
        id,
      },
      include: {
        project: {
          select: {
            name: true,
            id: true,
          },
        },
        deployments: {
          select: {
            status: true,
            updatedAt: true,
          },
        },
      },
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
