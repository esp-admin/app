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
}

export {};
