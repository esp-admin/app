import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const id = event.context.params?.id;

    const release = await prisma.release.delete({
      where: {
        id,
      },
    });

    return release;
  } catch (error) {
    await handleError(error);
  }
});
