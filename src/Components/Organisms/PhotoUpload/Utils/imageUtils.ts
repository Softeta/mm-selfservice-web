import { RefObject } from 'react'
import { PixelCrop } from 'react-image-crop'
import Resizer from 'react-image-file-resizer'

/*
 * A hack due to some packages following bad practices:
 * https://github.com/vitejs/vite/issues/2139#issuecomment-1024852072
 */
const ResizerInstance = (Resizer as any).default
  ? (Resizer as any).default
  : Resizer

const dataURLtoFile = (dataUrl: string, fileName: string): File | null => {
  const arr = dataUrl.split(',')
  if (arr.length < 1) {
    return null
  }

  const mimeMatches = arr[0].match(/:(.*?);/)
  if (!mimeMatches || mimeMatches.length < 2) {
    return null
  }

  const mime = mimeMatches[1]
  const bstr = window.atob(arr[1])

  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], fileName, { type: mime })
}

const resizeImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File | null> => {
  const compressFormat = 'JPEG'

  return new Promise((resolve) => {
    ResizerInstance.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      100,
      0,
      (fileResult: any) => resolve(fileResult as File | null),
      'file'
    )
  })
}

export async function createImageBlob(
  imageName: string,
  imgRef: RefObject<HTMLImageElement>,
  crop: PixelCrop,
  maxWidth: number,
  maxHeight: number
): Promise<File | null> {
  if (!imgRef.current) {
    return null
  }

  const image = imgRef.current
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return null
  }

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  )

  ctx.restore()

  return new Promise((resolve) => {
    const reader = new FileReader()
    canvas.toBlob((blob) => {
      if (!blob) {
        return null
      }

      reader.readAsDataURL(blob)
      reader.onloadend = async () => {
        const imageFile = dataURLtoFile(reader.result as string, imageName)
        if (!imageFile) {
          resolve(null)
          return
        }

        const imageFileResized = await resizeImage(
          imageFile,
          maxWidth,
          maxHeight
        )
        resolve(imageFileResized)
      }
    })
  })
}
