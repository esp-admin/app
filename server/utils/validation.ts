import type { H3Event } from 'h3'
import type { Schema, infer as Infer } from 'zod'

export const REGEX_ID = /(^[a-fA-F0-9]{24}$)|(^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$)/
export const REGEX_VERSION = /^(\d+)\.(\d+)\.(\d+)(?:-([\w-.]+))?(?:\+([\w-.]+))?$/

export function validateId(event: H3Event) {
  const id = event.context.params?.id

  if (!id || !REGEX_ID.test(id)) {
    throw createInvalidIdError()
  }

  return id
}

export function validateBody<T extends Schema>(event: H3Event, schema: T) {
  return readValidatedBody<Infer<T>>(event, schema.parse)
}

export async function validateMultipartFormData<T extends Schema>(event: H3Event, schema: T) {
  const multipartFormData = await readMultipartFormData(event)

  const data: Infer<T> = {}

  multipartFormData?.forEach((el) => {
    if (el.name) {
      data[el.name] = el.filename ? el : el.data.toString()
    }
  })

  schema.parse(data)

  return data
}

export const multipartSchema = z.object({
  filename: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  data: z.custom<Buffer>(data => Buffer.isBuffer(data), {
    message: 'Expected a Buffer',
  }),
})
