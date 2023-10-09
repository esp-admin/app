export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_UUID)
  })

  schema.parse({ id })

  const device = await event.context.prisma.device.delete({
    where: {
      id
    }
  }).catch((e) => { throw createPrismaError(e) })

  return device
})
