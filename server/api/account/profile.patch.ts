export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const { name, picture } = await readBody(event)

  const user = await event.context.prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      picture
    }
  }).catch((e) => { throw createPrismaError(e) })

  return user
})
