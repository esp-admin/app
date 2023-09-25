export function createPrismaError (error: any) {
  return createError(`${error.meta.target} | ${error.code}`)
}
