export default defineEventHandler(async (event) => {
  checkUser(event)

  const { version, downloadPath, projectId } = await readBody<Release>(event)

  const schema = z.object({
    version: z.string().regex(REGEX_VERSION),
    projectId: z.string().regex(REGEX_ID),
    downloadPath: z.string().min(1),
  })

  schema.parse({ version, downloadPath, projectId })

  const release = await event.context.prisma.release.create({
    data: {
      version,
      downloadPath,
      project: {
        connect: {
          id: projectId,
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
