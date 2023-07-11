import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const { name } = await readBody<Project>(event);

    const schema = z.object({
      name: z.string().min(1),
    });

    schema.parse({ name });

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
