import type { H3Event } from "H3";
import { prisma } from "#auth";

export async function checkDevice(event: H3Event) {
  const deviceId = event.context.params?.id;

  const apiKey = getHeader(event, "Authorization");

  const device = await prisma.device.findUnique({
    where: {
      id: deviceId,
    },
  });

  if (!device || device.apiKey !== apiKey) {
    throw new Error("unauthorized");
  }

  return device;
}

function checkUser(event: H3Event) {}
