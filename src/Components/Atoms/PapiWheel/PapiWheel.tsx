import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

interface IProps {
  htmlUrl?: string
}

export const PapiWheel: React.FC<IProps> = ({ htmlUrl }) => {
  const [loading, setLoading] = useState(true)
  const [papiWheelImage, setPapiWheelImage] = useState<string>()

  useEffect(() => {
    if (!htmlUrl) {
      return
    }

    setLoading(true)
    fetch(htmlUrl).then((resp) => {
      resp.text().then((html) => {
        const div = document.createElement('div')
        div.innerHTML = html
        const divChildren = div.getElementsByTagName('div')
        for (const child of divChildren) {
          if (child.id === 'wheel') {
            const svg = child.getElementsByTagName('svg')[0]
            svg.setAttribute('width', '100%')
            svg.setAttribute('height', '100%')
            const svgProcessed = svg.outerHTML.replaceAll('#FFFFFF', '#F9F7F2')
            setPapiWheelImage(svgProcessed)
            setLoading(false)
            break
          }
        }
      })
    })
  }, [htmlUrl])

  return (
    <>
      {(!papiWheelImage || loading) && <CircularProgress />}
      {papiWheelImage && !loading && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(papiWheelImage)}`}
        />
      )}
    </>
  )
}
