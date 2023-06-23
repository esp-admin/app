import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const report = await prisma.report.findUnique({
      where: {
        userId,
      },
    });

    return report;
  } catch (error) {
    await handleError(error);
  }
});
