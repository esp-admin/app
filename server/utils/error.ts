export { z } from 'zod'

export function createPrismaError (error: any) {
  const h3Error = createError('server-error')

  switch (error.code) {
    case 'P2002':
      h3Error.statusCode = 409
      h3Error.message = `Unique constraint failed on ${error.meta.target}`
      break
    case 'P2014':
      h3Error.statusCode = 409
      h3Error.message = `Required relation violation on ${error.meta.relation_name}`
      break
  }

  return h3Error
}

export function createUnauthorizedError () {
  const h3Error = createError({
    message: 'unauthorized',
    statusCode: 401
  })

  return h3Error
}
