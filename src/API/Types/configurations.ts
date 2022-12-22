import { Accept } from 'react-dropzone'

export type TCandidatePictureConfigurations = {
  aspectRatio: number
  maxWidth: number
  maxHeight: number
}

export type TConfigurations = {
  imageSupportTypes: Accept
  photoImageSupportTypes: Accept
  fileSupportTypes: Accept
  videoSupportTypes: Accept
  candidatePicture: TCandidatePictureConfigurations
  maxFileSize: number
  maxVideoFileSize: number
}
