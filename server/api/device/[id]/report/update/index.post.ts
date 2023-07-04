import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  interface Body {
    releaseId: Release["id"];
    deploymentId: Deployment["id"];
    status: Deployment["status"];
  }

  try {
    const { id: deviceId } = await checkDevice(event);

    const body = await readBody<Body>(event);

    if (body.status == "started") {
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
              id: body.releaseId,
            },
          },
        },
        select: {
          id: true,
        },
      });

      return deployment.id;
    }

    const deployment = await prisma.deployment.update({
      where: {
        id: body.deploymentId,
      },
      data: {
        status: body.status,
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
