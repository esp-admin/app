import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const id = event.context.params?.id;

    const data = await readBody<Partial<Deployment>>(event);

    const deployment = await prisma.deployment.update({
      where: {
        id,
      },
      data,
    });

    return deployment;
  } catch (error) {
    await handleError(error);
  }
});
