import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const id = event.context.params?.id;

    const data = await readBody<Release>(event);

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        releases: {
          create: data,
        },
      },
      include: {
        releases: true,
      },
    });

    return project;
  } catch (error) {
    await handleError(error);
  }
});
