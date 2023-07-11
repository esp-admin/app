import type {
  Project as ProjectRaw,
  Release as ReleaseRaw,
  Device as DeviceRaw,
  Mqtt as MqttRaw,
  Report as ReportRaw,
  User as UserRaw,
  Deployment as DeploymentRaw,
} from "@prisma/client";

import { Options } from "highcharts";

declare global {
  interface HighchartsOptions extends Options {}

  interface Project extends ProjectRaw {}

  interface Release extends ReleaseRaw {}

  interface Device extends DeviceRaw {}

  interface Mqtt extends MqttRaw {}

  interface User extends UserRaw {}

  interface Report extends ReportRaw {}

  interface Deployment extends DeploymentRaw {
    release?: ReleaseRaw;
  }

  interface CommandMessage {
    deviceId: Device["id"];
    action: "command";
    type: "config" | "log" | "restart" | "update" | "custom";
    payload: string;
    retained: boolean;
  }

  interface ReportMessage {
    deviceId: Device["id"];
    action: "report";
    type: "status" | "update" | "custom";
    retained: boolean;
    payload: string;
  }

  interface LoggingMessage {
    deviceId: Device["id"];
    action: "logs";
    type: "info" | "error" | "warn" | "success";
    payload: string;
    retained: boolean;
  }

  type MqttMessage = CommandMessage | LoggingMessage | ReportMessage;
}

export {};
