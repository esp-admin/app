import { setPermissions } from "#s3";

export default defineEventHandler((event) => {
  let userRole;

  try {
    userRole = checkUser(event).userRole;
  } catch (e) {}

  setPermissions(event, {
    bucket: {
      create: false,
      delete: false,
      list: false,
    },
    object: {
      create: userRole === "admin" || userRole === "user",
      delete: userRole === "admin" || userRole === "user",
      list: false,
      read: true,
      update: userRole === "admin" || userRole === "user",
    },
  });
});
