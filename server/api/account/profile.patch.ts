export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const { name, picture } = await readBody(event)

  const schema = z.object({
    name: z.string().min(1),
    picture: z.string().min(1),
  })

  schema.parse({ name, picture })

  const user = await event.context.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      picture,
    },
    select: {
      id: true,
    },
  }).catch((e) => { throw createPrismaError(e) })

  return user
})
