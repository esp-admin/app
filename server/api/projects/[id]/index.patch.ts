import { handleError, prisma } from "#auth";
import type { Project } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const id = event.context.params?.id;

    const data = await readBody<Partial<Project>>(event);

    const project = await prisma.project.update({
      where: {
        id,
      },
      data,
    });

    return project;
  } catch (error) {
    await handleError(error);
  }
});
