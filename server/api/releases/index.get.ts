import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const { projectId } = getQuery(event) as { projectId: Project["id"] };

    if (!projectId) {
      throw new Error("<projectId> is required");
    }

    const releases = await prisma.release.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        version: true,
        downloadUrl: true,
        createdAt: true,
      },
    });

    return releases;
  } catch (error) {
    await handleError(error);
  }
});
