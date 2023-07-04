import type { H3Event } from "H3";
import { prisma, getAccessTokenFromHeader, verifyAccessToken } from "#auth";

export async function checkDevice(event: H3Event) {
  const deviceId = event.context.params?.id;

  const apiKey = getHeader(event, "Api-Key");

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

export function checkUser(event: H3Event) {
  try {
    const accessToken = getAccessTokenFromHeader(event) || "";
    return verifyAccessToken(accessToken);
  } catch (error) {
    throw new Error("unauthorized");
  }
}
