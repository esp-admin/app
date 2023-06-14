import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const { projectId } = getQuery(event) as { projectId: Project["id"] };

    const releases = await prisma.release.findMany({
      where: {
        projectId,
      },
    });

    return releases;
  } catch (error) {
    await handleError(error);
  }
});
