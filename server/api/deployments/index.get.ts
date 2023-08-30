import { handleError } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const { deviceId } = getQuery(event) as { deviceId: Device["id"] };

    const schema = z.object({
      deviceId: z.string().regex(/^[a-fA-F0-9]{24}$/),
    });

    schema.parse({ deviceId });

    const deployments = await event.context.prisma.deployment.findMany({
      where: {
        deviceId,
      },
      include: {
        release: {
          select: {
            version: true,
            projectId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return deployments;
  } catch (error) {
    await handleError(error);
  }
});
