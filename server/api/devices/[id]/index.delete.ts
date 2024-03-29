export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID)
  })

  schema.parse({ id })

  const device = await event.context.prisma.device.delete({
    where: {
      id,
      userId
    },
    select: {
      id: true
    }
  }).catch((e) => { throw createPrismaError(e) })

  return device
})
