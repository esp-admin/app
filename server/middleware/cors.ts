export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  setResponseHeader(event, 'Access-Control-Allow-Origin', config.public.auth.baseUrl)
})
