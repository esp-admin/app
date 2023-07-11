import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const data = await readBody<Release>(event);

    const release = await prisma.release.create({
      data: {
        version: data.version,
        downloadPath: data.downloadPath,
        project: {
          connect: {
            id: data.projectId,
          },
        },
      },
    });

    return release;
  } catch (error) {
    await handleError(error);
  }
});
