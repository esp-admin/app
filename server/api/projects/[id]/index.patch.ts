import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const id = event.context.params?.id;
    const data = await readBody<Partial<Project>>(event);

    const schema = z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/),
    });

    schema.parse({ id });

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
