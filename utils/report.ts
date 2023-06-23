export function handleReport(message: ReportMessage) {
  switch (message.type) {
    case "status":
      handleStatus(message);
      break;
    case "update":
      handleUpdate(message);
      break;
  }
}

async function handleStatus(message: ReportMessage) {
  const { update } = useDevice();

  await update(message.deviceId, {
    status: message.payload as Device["status"],
  });
}

async function handleUpdate(message: ReportMessage) {}
