import { handleError, prisma } from "#auth";
import type { Project } from "@prisma/client";

interface IQuery {
  name?: Project["name"];
}

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const query = getQuery(event) as IQuery;

    const projects = await prisma.project.findMany({
      where: {
        name: query.name,
        userId,
      },
    });

    return projects;
  } catch (error) {
    await handleError(error);
  }
});
