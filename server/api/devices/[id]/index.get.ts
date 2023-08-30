import { handleError } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const id = event.context.params?.id;

    const schema = z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/),
    });

    schema.parse({ id });

    const device = await event.context.prisma.device.findUnique({
      where: {
        id,
      },
      include: {
        project: {
          select: {
            name: true,
            id: true,
          },
        },
        deployments: {
          select: {
            status: true,
            updatedAt: true,
          },
        },
      },
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
