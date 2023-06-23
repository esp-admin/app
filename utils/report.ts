import { destr } from "destr";

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

  const device = destr<Device>(message.payload);

  await update(message.deviceId, {
    status: device.status,
  });
}

async function handleUpdate(message: ReportMessage) {
  const { update } = useDeployment(message.deviceId);

  const deployment = destr<Deployment>(message.payload);

  await update(deployment.id, {
    status: deployment.status,
  });
}
