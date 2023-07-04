import { handleError, prisma, sendMail } from "#auth";

export default defineEventHandler(async (event) => {
  interface Body {
    type: "info" | "error" | "warn" | "success";
    subject: String;
    body: String;
  }

  try {
    const { userId } = await checkDevice(event);

    const message = await readBody<Body>(event);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });

    if (user?.email) {
      sendMail({
        subject: `[${message.type}] ${message.subject}`,
        to: user.email,
        html: `<p>${message.body}</p>`,
      });
    }

    return "ok";
  } catch (error) {
    await handleError(error);
  }
});
