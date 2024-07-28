export function copiedToClipboard() {
  useNaiveNotification().create({
    type: 'success',
    title: 'Copied to Clipboard',
    duration: 3000,
  })
}
