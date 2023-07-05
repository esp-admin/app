export function handleReport(message: ReportMessage) {
  switch (message.type) {
    case "status":
      handleStatus(message);
      break;
    case "update":
      handleUpdate(message);
      break;
    case "custom":
      handleCustom(message);
  }
}

export async function handleStatus(message: ReportMessage) {
  const { update } = useDevice();

  const device = JSON.parse(message.payload) as Device;

  await update(message.deviceId, {
    status: device.status,
  });
}

export async function handleUpdate(message: ReportMessage) {
  const { update } = useDeployment(message.deviceId);

  const { deploymentId, status } = JSON.parse(message.payload) as {
    deploymentId: Deployment["id"];
    status: Deployment["status"];
  };

  await update(deploymentId, status);
}

export function handleCustom(message: ReportMessage) {}
