import type {
  Project as ProjectRaw,
  Release as ReleaseRaw,
  Device as DeviceRaw,
} from "@prisma/client";

declare global {
  interface Project extends ProjectRaw {
    releases: ReleaseRaw[];
  }

  interface Release extends ReleaseRaw {}

  interface Device extends DeviceRaw {}
}

export {};
