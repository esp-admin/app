import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    // Check API key !

    const deviceId = event.context.params!.id;

    const data = await readBody<Deployment>(event);

    const deployment = await prisma.deployment.create({
      data: {
        deviceId,
        device: {
          connect: {
            id: deviceId,
          },
        },
        release: {
          connect: {
            id: data.releaseId,
          },
        },
      },
    });

    return deployment;
  } catch (error) {
    await handleError(error);
  }
});
