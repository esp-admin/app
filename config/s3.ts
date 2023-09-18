import type { ModuleOptions } from "nuxt-s3";

export const s3: Partial<ModuleOptions> = {
  region: "*",
  endpoint: "*",
  accessKeyId: "*",
  secretAccessKey: "*",
  bucket: "*",
  accept: "^(image/(png|jpeg|png|gif))|(application/octet-stream)",
};
