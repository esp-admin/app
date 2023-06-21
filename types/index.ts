import type {
  Project as ProjectRaw,
  Release as ReleaseRaw,
  Device as DeviceRaw,
  Mqtt as MqttRaw,
  Report as ReportRaw,
  User as UserRaw,
} from "@prisma/client";

declare global {
  interface Project extends ProjectRaw {}

  interface Release extends ReleaseRaw {}

  interface Device extends DeviceRaw {}

  interface Mqtt extends MqttRaw {}

  interface User extends UserRaw {}

  interface Report extends ReportRaw {}

  interface CommandMessage {
    deviceId: Device["id"];
    action: "command";
    type: "config" | "debug" | "restart" | "update" | "custom";
    payload: string;
    retained: boolean;
  }

  interface ReportMessage {
    deviceId: Device["id"];
    action: "report";
    type: "status" | "update" | "debug";
    payload: string;
    retained: boolean;
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
