import clsx from 'clsx'

interface IProps {
  url?: string
  alt?: string
  annotation?: string
  roundingClassName?: string
  showEmptyImageBox?: boolean
}

export const ImageBox: React.FC<IProps> = ({
  url,
  alt,
  annotation,
  roundingClassName = 'rounded-md',
  showEmptyImageBox = false
}) => {
  return (
    <div
      className={clsx(
        'z-0 grid h-24 w-24 place-content-center overflow-hidden font-poppins font-bold text-white',
        roundingClassName
      )}
    >
      {annotation && (
        <div className="absolute z-10 grid h-6 w-6 place-content-center rounded-full bg-mine-shaft">
          <span className="text-base">{annotation}</span>
        </div>
      )}
      {alt && !url && (
        <div
          className={clsx(
            'z-0 grid h-20 w-20 place-content-center bg-nobel font-poppins font-bold text-white',
            roundingClassName
          )}
        >
          <span className="text-3xl">{alt}</span>
        </div>
      )}
      {!url && showEmptyImageBox && (
        <div
          className={clsx(
            'z-0 grid h-20 w-20 place-content-center bg-nobel font-poppins font-bold text-white',
            roundingClassName
          )}
        ></div>
      )}
      {url && <img src={url} alt={alt} className="m-auto" />}
    </div>
  )
}
