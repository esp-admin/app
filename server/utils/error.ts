export function createPrismaError (error: any) {
  let statusCode

  switch (error.code) {
    case 'P2002':
      statusCode = 409
      break
    default:
      statusCode = 500
  }

  return createError({
    statusCode,
    message: `${error.meta.target} | ${error.code}`
  })
}
