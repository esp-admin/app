import { handleError, prisma } from "#auth";
import type { Project } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

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