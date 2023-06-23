import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const device = await checkDevice(event);

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
