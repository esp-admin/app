import { handleError, prisma, sendMail } from "#auth";
import Mustache from "mustache";

export default defineEventHandler(async (event) => {
  interface Body {
    type: "info" | "error" | "warn" | "success";
    subject: string;
    body: string;
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
        subject: `${message.type} | ${message.subject}`,
        to: report.emailAddress,
        html: Mustache.render(reportTemplate, {
          type: message.type,
          body: message.body,
        }),
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

const reportTemplate = `
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        body {
            background-color: #f1f5f9;
            color: #0f172a;
            font-family: "Arial";
            padding: 8px;
        }

        a {
            cursor: pointer;
            display: block;
            text-align: center;
            color: #4438cac5;
            margin: 8px;
        }

        header {
            text-align: center;
            padding: 8px;
            background-color: rgba(0, 0, 255, 0.295);
        }

        .type {
            font-weight: bold;
            display: inline;
        }

        .payload {
            font-style: italic;
        }
    </style>
</head>

<body>
    <header>
        <h3>ESP Admin</h3>
    </header>

    <h3>Hello</h3>

    <span>We have received <p class="type">{{type}}</p> custom report message with the following payload</span>

    <p class="payload">
        {{body}}
    </p>
</body>

</html>`;
