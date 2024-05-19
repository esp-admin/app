export default function useUpload() {
  const { user } = useAuthSession()

  function upload(file: File, url?: string) {
    return useS3Object().upload(file, { url, prefix: `${user.value?.id}/` })
  }

  function remove(urls: string[]) {
    const { remove } = useS3Object()
    return Promise.all(urls.map(remove))
  }

  return { upload, remove }
}
