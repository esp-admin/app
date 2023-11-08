export default defineNuxtPlugin({
  hooks: {
    's3:auth': async (headers) => {
      const { getAccessToken } = useAuthSession()

      const token = await getAccessToken()

      // Passing access token for upload and remove endpoints
      headers.authorization = `Bearer ${token}`
    }
  }
})
