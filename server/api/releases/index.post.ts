export default defineEventHandler(async (event) => {
  checkUser(event)

  const { version, downloadPath, projectId } = await readBody<Release>(event)

  const schema = z.object({
    version: z
      .string()
      .regex(/^(\d+)\.(\d+)\.(\d+)(?:-([\w-.]+))?(?:\+([\w-.]+))?$/),
    projectId: z.string().regex(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/),
    downloadPath: z.string().min(1)
  })

  schema.parse({ version, downloadPath, projectId })

  const release = await event.context.prisma.release.create({
    data: {
      version,
      downloadPath,
      project: {
        connect: {
          id: projectId
        }
      }
    }
  }).catch((e) => { throw createPrismaError(e) })

  return release
})
