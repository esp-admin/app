import { handleError, prisma } from "#auth";
import type { Device } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.auth?.userId;

    if (!userId) {
      throw new Error("unauthorized");
    }

    const id = event.context.params?.id;

    const data = await readBody<Partial<Device>>(event);

    const device = await prisma.device.update({
      where: {
        id,
      },
      data,
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
