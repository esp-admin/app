import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  interface Body {
    releaseId: Release["id"];
  }

  try {
    const { id: deviceId } = await checkDevice(event);

    const { releaseId } = await readBody<Body>(event);

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
            id: releaseId,
          },
        },
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
