import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const data = await readBody<Release>(event);

    const release = await prisma.release.create({
      data: {
        version: data.version,
        downloadUrl: data.downloadUrl,
        project: {
          connect: {
            id: data.projectId,
          },
        },
      },
    });

    return release;
  } catch (error) {
    console.log(error);
    await handleError(error);
  }
});
