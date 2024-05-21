import { parseURL, withoutTrailingSlash, joinURL } from 'ufo'
import type { MultiPartData, H3Event } from 'h3'
import mime from 'mime'
import { normalizeKey, verifySize, verifyType } from '#s3'

function getKeyFromUrl(url: string) {
  const regex = /^\/api\/s3\/query\//
  const pathname = withoutTrailingSlash(parseURL(url).pathname)

  if (regex.test(pathname)) {
    return pathname.replace(regex, '')
  }
}

export async function deleteObject(url: string) {
  const key = getKeyFromUrl(url)

  if (key) {
    await useStorage('s3').removeItem(normalizeKey(key), { removeMeta: true })
  }
}

export async function uploadObject(event: H3Event, file: MultiPartData, url?: string) {
  const { userId } = checkUser(event)

  const ext = file.filename?.split('.').pop()

  z.string().min(3).parse(ext)
  verifyType(file.type)
  verifySize(file.data.length)

  const key = `${userId}/${new Date().getTime()}.${ext}`

  await useStorage('s3').setItemRaw(normalizeKey(key), file.data, {
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.data.length,
    },
  }).catch(() => {
    throw createFailedUploadError()
  })

  if (url) {
    await deleteObject(url)
  }

  return joinURL('/api/s3/query', key)
}

export async function streamObject(event: H3Event) {
  const key = getKeyFromUrl(event.path)

  if (!key) {
    throw createError({ statusCode: 404 })
  }

  const data = await useStorage('s3').getItemRaw(normalizeKey(key))

  if (data === null) {
    throw createError({ statusCode: 404 })
  }

  const mimeType = mime.getType(key)

  if (mimeType) {
    setResponseHeader(event, 'Content-Type', mimeType)
  }

  setResponseHeader(event, 'Cache-Control', 'public, max-age=2592000, immutable')

  return data
}
