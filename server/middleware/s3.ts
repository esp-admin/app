export default defineEventHandler((event) => {
  const isS3Mutation = getRequestURL(event).pathname.includes('s3/mutation')

  if (isS3Mutation) {
    checkUser(event)
    // https://github.com/unjs/nitro/issues/1719
    if (typeof event.node.req.body === 'string') {
      event.node.req.body = Buffer.from(event.node.req.body, 'base64').toString(
        'utf8'
      )
    }
  }
})
