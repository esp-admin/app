// @ts-nocheck
export default defineEventHandler((event) => {
  const isS3Mutation = getRequestURL(event).pathname.includes('s3/mutation')
  const isS3Query = getRequestURL(event).pathname.includes('s3/query')

  if (isS3Mutation) {
    checkUser(event)

    // https://github.com/unjs/nitro/issues/1719
    const isBase64 = (value: string) => {
      if (typeof value !== 'string') { return false }
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
        value
      )
    }

    if (isBase64(event.node.req.body)) {
      event.node.req.body = Buffer.from(event.node.req.body, 'base64')
    }
  } else if (isS3Query) {
    setResponseHeader(event, 'Cache-Control', 'public, max-age=2592000, immutable')
  }
})
