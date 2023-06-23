import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

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
