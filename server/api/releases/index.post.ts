import { handleError } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const { version, downloadPath, projectId } = await readBody<Release>(event);

    const schema = z.object({
      version: z
        .string()
        .regex(/^(\d+)\.(\d+)\.(\d+)(?:-([\w-.]+))?(?:\+([\w-.]+))?$/),
      projectId: z.string().regex(/^[a-fA-F0-9]{24}$/),
      downloadPath: z.string().min(1),
    });

    schema.parse({ version, downloadPath, projectId });

    const release = await event.context.prisma.release.create({
      data: {
        version: version,
        downloadPath: downloadPath,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    return release;
  } catch (error) {
    await handleError(error);
  }
});
