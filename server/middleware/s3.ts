// @ts-nocheck
export default defineEventHandler((event) => {
  const { pathname } = getRequestURL(event)
  const isS3Mutation = pathname.startsWith('/api/s3/mutation')
  const isS3Query = pathname.startsWith('/api/s3/query')

  if (isS3Mutation) {
    checkUpload(event)
  } else if (isS3Query) {
    setResponseHeader(event, 'Cache-Control', 'public, max-age=2592000, immutable')
  }
})
