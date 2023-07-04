import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  interface Body {
    deploymentId: Deployment["id"];
    status: Deployment["status"];
  }

  try {
    const device = await checkDevice(event);

    const { deploymentId, status } = await readBody<Body>(event);

    const deployment = await prisma.deployment.update({
      where: {
        id: deploymentId,
      },
      data: {
        status,
      },
      select: {
        id: true,
      },
    });

    return deployment.id;
  } catch (error) {
    await handleError(error);
  }
});
