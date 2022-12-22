import clsx from 'clsx'

interface IProps {
  text: string
  variant?: string
  className?: string
}

export const Chip: React.FC<IProps> = ({ text, variant, className }) => {
  return (
    <div className={clsx(!className && 'mt-3 text-2xs', className)}>
      {variant && (
        <span
          className={clsx(
            'mr-1 inline-block h-2 w-2 rounded-full',
            variant === 'gray' && 'bg-nobel',
            variant === 'green' && 'bg-emerald',
            variant === 'black' && 'bg-black'
          )}
        />
      )}
      <span className="text-black">{text}</span>
    </div>
  )
}
