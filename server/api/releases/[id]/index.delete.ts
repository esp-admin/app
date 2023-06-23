import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

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
