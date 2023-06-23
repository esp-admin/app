import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

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
