export { z } from 'zod'

interface PrismaError {
  code: string
  meta: {
    target: string
    relation_name: string
  }
}

export function createPrismaError(error: PrismaError) {
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
    case 'P2025':
      h3Error.statusCode = 404
      h3Error.message = 'Not found'
      break
  }

  return h3Error
}

export function createUnauthorizedError() {
  const h3Error = createError({
    message: 'unauthorized',
    statusCode: 401,
  })

  return h3Error
}
