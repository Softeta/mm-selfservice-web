import { TConfigurations } from 'API/Types/configurations'
import { createContext } from 'react'

const initConfigurations: TConfigurations = {
  imageSupportTypes: {
    'image/jpeg': [],
    'image/png': [],
    'image/svg': []
  },
  photoImageSupportTypes: {
    'image/jpeg': [],
    'image/png': []
  },
  fileSupportTypes: {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      [],
    'application/pdf': [],
    'image/jpeg': [],
    'image/png': [],
    'image/tiff': []
  },
  videoSupportTypes: {
    'video/mp4': [],
    'video/quicktime': [],
    'video/x-msvideo': [],
    'video/x-ms-wmv': []
  },
  candidatePicture: {
    aspectRatio: 0.75,
    maxWidth: 360,
    maxHeight: 480
  },
  maxFileSize: 2097152, // 2 MB
  maxVideoFileSize: 20971520 // 20 MB
}

const ConfigurationsContext = createContext({} as TConfigurations)

export { ConfigurationsContext, initConfigurations }
