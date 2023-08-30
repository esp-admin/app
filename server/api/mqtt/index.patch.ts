import { handleError } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const { uriTCP, uriWS, username, password } = await readBody<Mqtt>(event);

    const schema = z.object({
      uriTCP: z.string().url(),
      uriWS: z.string().url(),
      username: z.string().min(1),
      password: z.string().min(1),
    });

    schema.parse({ uriTCP, uriWS, username, password });

    const mqtt = await event.context.prisma.mqtt.update({
      where: {
        userId,
      },
      data: {
        uriTCP,
        uriWS,
        username,
        password,
      },
    });

    return mqtt;
  } catch (error) {
    await handleError(error);
  }
});
