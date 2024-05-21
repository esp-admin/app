export default defineEventHandler(async (event) => {
  checkUser(event)

  const schema = z.object({
    version: z.string().regex(REGEX_VERSION),
    projectId: z.string().regex(REGEX_ID),
    file: multipartSchema,
  })

  const multipart = await validateMultipartFormData(event, schema)

  const downloadPath = await uploadObject(event, multipart.file)

  const release = await event.context.prisma.release.create({
    data: {
      version: multipart.version,
      downloadPath,
      project: {
        connect: {
          id: multipart.projectId,
        },
      },
    },
    select: {
      id: true,
      version: true,
      downloadPath: true,
      createdAt: true,
      projectId: true,
    },
  }).catch((err) => { throw createPrismaError(err) })

  return release
})
