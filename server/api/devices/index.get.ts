import { handleError, prisma } from "#auth";
import type { Project } from "@prisma/client";
interface IQuery {
  unlinked?: boolean;
  projectId?: Project["id"];
}

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const query = getQuery(event) as IQuery;

    const devices = await prisma.device.findMany({
      where: {
        projectId: query.projectId,
        project: query.unlinked ? null : undefined,
        userId,
      },
    });

    return devices;
  } catch (error) {
    await handleError(error);
  }
});
