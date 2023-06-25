import { setPermissions } from "#s3";

export default defineEventHandler(async (event) => {
  try {
    const { userRole } = checkUser(event);

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
        read: userRole === "admin" || userRole === "user",
        update: userRole === "admin" || userRole === "user",
      },
    });
  } catch (error) {}
});
