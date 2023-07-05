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

    const report = await prisma.report.findUnique({
      where: {
        userId,
      },
    });

    if (!report) {
      throw new Error("unauthorized");
    }

    if (report.emailEnable && report.emailAddress) {
      sendMail({
        subject: `[${message.type}] ${message.subject}`,
        to: report.emailAddress,
        html: `<p>${message.body}</p>`,
      });
    }

    if (report.webhookEnable && report.webhookUrl) {
      await $fetch(report.webhookUrl, {
        method: "POST",
        body: {
          type: message.type,
          subject: message.subject,
          body: message.body,
        },
      }).catch(console.error);
    }

    return "ok";
  } catch (error) {
    await handleError(error);
  }
});
