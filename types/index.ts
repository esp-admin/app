import type {
  Project as ProjectRaw,
  Release as ReleaseRaw,
  Device as DeviceRaw,
  Mqtt as MqttRaw,
  Settings as SettingsRaw,
  Report as ReportRaw,
} from "@prisma/client";

declare global {
  interface Project extends ProjectRaw {}

  interface Release extends ReleaseRaw {}

  interface Device extends DeviceRaw {}

  interface Mqtt extends MqttRaw {}

  interface Settings extends SettingsRaw {}

  interface Report extends ReportRaw {}
}

export {};
