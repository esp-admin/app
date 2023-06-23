import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });

    return projects;
  } catch (error) {
    await handleError(error);
  }
});
