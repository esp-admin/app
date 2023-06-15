import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

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
