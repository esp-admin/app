import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const id = event.context.params?.id;

    const project = await prisma.project.delete({
      where: {
        id,
      },
    });

    return project;
  } catch (error) {
    await handleError(error);
  }
});
