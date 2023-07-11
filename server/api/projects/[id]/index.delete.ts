import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const id = event.context.params?.id;

    const schema = z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/),
    });

    schema.parse({ id });

    const project = await prisma.project.delete({
      where: {
        id,
      },
    });

    return project;
  } catch (error) {
    await handleError(error);
  }
});
