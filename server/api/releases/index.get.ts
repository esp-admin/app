import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const { projectId } = getQuery(event) as { projectId: Project["id"] };

    const schema = z.object({
      projectId: z.string().regex(/^[a-fA-F0-9]{24}$/),
    });

    schema.parse({ projectId });

    const releases = await prisma.release.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        version: true,
        downloadPath: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return releases;
  } catch (error) {
    await handleError(error);
  }
});
