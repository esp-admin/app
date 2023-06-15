import { setPermissions } from "#s3";

export default defineEventHandler((event) => {
  const role = event.context.auth?.userRole;

  setPermissions(event, {
    bucket: {
      create: false,
      delete: false,
      list: false,
    },
    object: {
      create: role === "admin" || role === "user",
      delete: role === "admin" || role === "user",
      list: false,
      read: role === "admin" || role === "user",
      update: role === "admin" || role === "user",
    },
  });
});
