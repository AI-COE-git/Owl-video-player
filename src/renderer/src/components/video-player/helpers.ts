export const loadVideo = (file: File): Promise<HTMLVideoElement> =>
  new Promise((resolve, reject) => {
    try {
      const videoElem = document.createElement('video')
      videoElem.preload = 'metadata'

      videoElem.onloadedmetadata = function () {
        resolve(videoElem)
      }

      videoElem.onerror = function () {
        reject(new Error('Invalid video file. Please select a valid video file.'))
      }

      videoElem.src = window.URL.createObjectURL(file)
    } catch (error) {
      reject(error)
    }
  })

export const nextFrameKeys = ['o', 'O', 'ArrowRight']
export const prevFrameKeys = ['i', 'I', 'ArrowLeft']
export const playPauseKeys = ['Space']
export const exitFullScreenKeys = ['Escape']

export const saveImage = (dataURL: string) => {
  // Remove header from base64 data URL
  const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '')

  // Convert base64 to blob
  const blob = b64toBlob(base64Data, 'image/png')

  // Create a temporary URL for the blob
  const url = URL.createObjectURL(blob)

  // Create a link element
  const link = document.createElement('a')
  link.href = url
  link.download = 'snapshot.png'

  // Trigger the download
  document.body.appendChild(link)
  link.click()

  // Cleanup
  URL.revokeObjectURL(url)
  document.body.removeChild(link)
}

// Function to convert base64 to blob
const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays: Uint8Array[] = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}
