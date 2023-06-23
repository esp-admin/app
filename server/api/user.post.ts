import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const { name, picture } = await readBody(event);

    const user = await prisma.user.update({
      where: {
        id: event.context.auth.userId,
      },
      data: {
        name,
        picture,
      },
    });

    return user;
  } catch (error) {
    await handleError(error);
  }
});
