import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const { name } = await readBody<Project>(event);

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
