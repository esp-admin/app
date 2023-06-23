import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const device = await checkDevice(event);

    const data = await readBody<Deployment>(event);

    const deployment = await prisma.deployment.create({
      data: {
        deviceId: device.id,
        device: {
          connect: {
            id: device.id,
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
