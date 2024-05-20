export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    name: z.string().min(1).optional(),
    picture: z.string().min(1).optional(),
  })

  const body = await validateBody(event, schema)

  const user = await event.context.prisma.user
    .update({
      where: {
        id: userId,
      },
      data: {
        name: body.name,
        picture: body.picture,
      },
      select: {
        id: true,
      },
    })
    .catch((err) => {
      throw createPrismaError(err)
    })

  return user
})
