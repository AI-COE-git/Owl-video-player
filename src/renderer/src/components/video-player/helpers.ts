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
