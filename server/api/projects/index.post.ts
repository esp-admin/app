import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const { name } = await readBody<{ name: string }>(event);

    const project = await prisma.project.create({
      data: {
        name,
        userId,
      },
    });

    return project;
  } catch (error) {
    await handleError(error);
  }
});
