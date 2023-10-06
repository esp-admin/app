export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  handleCors(event, {
    origin: [config.public.auth.baseUrl]
  })
})
