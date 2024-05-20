export default defineEventHandler(async (event) => {
  checkUser(event)

  const schema = z.object({
    version: z.string().regex(REGEX_VERSION),
    projectId: z.string().regex(REGEX_ID),
    downloadPath: z.string().min(1),
  })

  const body = await validateBody(event, schema)

  const release = await event.context.prisma.release.create({
    data: {
      version: body.version,
      downloadPath: body.downloadPath,
      project: {
        connect: {
          id: body.projectId,
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
  }).catch((e) => { throw createPrismaError(e) })

  return release
})
