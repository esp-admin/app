import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
    });

    return projects;
  } catch (error) {
    await handleError(error);
  }
});
