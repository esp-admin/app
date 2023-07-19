import type { ModuleOptions } from "@bg-dev/nuxt-s3";

export const s3: Partial<ModuleOptions> = {
  client: {
    region: process.env.S3_CLIENT_REGION || "auto",
    endpoint: process.env.S3_CLIENT_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_CLIENT_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.S3_CLIENT_SECRET_ACCESS_KEY || "",
    },
  },

  bucket: process.env.S3_BUCKET,

  image: {},

  cacheControl: "public,s-maxage=31536000,immutable",
};
