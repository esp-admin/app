export default defineEventHandler((event) => {
  const isS3Mutation = getRequestURL(event).pathname.includes('s3/mutation')
  const isS3Query = getRequestURL(event).pathname.includes('s3/query')

  if (isS3Mutation) {
    checkUser(event)

    // https://github.com/unjs/nitro/issues/1719
    const isBase64 = (value: string) => {
      if (typeof value !== 'string') { return false }
      // https://debugpointer.com/regex/regex-for-base64
      return /^(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$/gm.test(
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
