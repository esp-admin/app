export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
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
  })
})
