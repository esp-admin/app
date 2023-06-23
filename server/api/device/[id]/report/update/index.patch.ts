import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    // Check API key !

    const deviceId = event.context.params!.id;

    const data = await readBody<Deployment>(event);

    const deployment = await prisma.deployment.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });

    return deployment;
  } catch (error) {
    await handleError(error);
  }
});
