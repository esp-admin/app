import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const id = event.context.params?.id;

    const deployment = await prisma.deployment.findUnique({
      where: {
        id,
      },
      include: {
        release: {
          select: {
            version: true,
            projectId: true,
          },
        },
      },
    });

    return deployment;
  } catch (error) {
    await handleError(error);
  }
});
