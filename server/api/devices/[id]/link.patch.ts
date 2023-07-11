import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const id = event.context.params?.id;
    const { projectId } = await readBody<Device>(event);

    const schema = z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/),
      projectId: z.string().regex(/^[a-fA-F0-9]{24}$/),
    });

    schema.parse({ id, projectId });

    const device = await prisma.device.update({
      where: {
        id,
      },
      data: {
        project: {
          connect: {
            id: projectId || undefined,
          },
        },
      },
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
