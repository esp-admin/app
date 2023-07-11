import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  interface Body {
    releaseId: Release["id"];
    deploymentId: Deployment["id"];
    status: Deployment["status"];
  }

  try {
    const { id: deviceId } = await checkDevice(event);

    const body = await readBody<Body>(event);

    const schema = z.object({
      status: z.string().min(1),
    });

    schema.parse({ status: body.status });

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
