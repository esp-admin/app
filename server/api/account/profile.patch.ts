export default defineEventHandler(async (event) => {
  const { userId } = checkUser(event)

  const schema = z.object({
    name: z.string().min(1).optional(),
    picture: z.string().min(1).optional(),
    file: multipartSchema.optional(),
  })

  const multipart = await validateMultipartFormData(event, schema)

  if (multipart.file) {
    multipart.picture = await uploadObject(multipart.file, userId, multipart.picture)
  }

  const user = await event.context.prisma.user
    .update({
      where: {
        id: userId,
      },
      data: {
        name: multipart.name,
        picture: multipart.picture,
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
