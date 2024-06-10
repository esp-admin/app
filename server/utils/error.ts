import { consola } from 'consola'

export { z } from 'zod'

interface PrismaError {
  code: string
  meta: {
    target: string
    relation_name: string
  }
}

export function createPrismaError(error: PrismaError) {
  const h3Error = createError({ statusCode: 500, message: 'Something went wrong' })

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
    default:
      consola.error(error)
      break
  }

  return h3Error
}

export function createUnauthorizedError() {
  return createError({
    message: 'Unauthorized',
    statusCode: 401,
  })
}

export function createInvalidIdError() {
  return createError({
    message: 'Invalid ID',
    statusCode: 400,
  })
}

export function createFailedUploadError(err: Error) {
  consola.error(err)
  return createError({
    message: 'Upload failed',
    statusCode: 500,
  })
}
