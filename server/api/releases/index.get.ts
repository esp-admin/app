import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

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
      orderBy: {
        createdAt: "desc",
      },
    });

    return releases;
  } catch (error) {
    await handleError(error);
  }
});
