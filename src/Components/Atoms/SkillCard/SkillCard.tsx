import { DetailedHTMLProps, forwardRef, LiHTMLAttributes } from 'react'

export type SkillCardProps = DetailedHTMLProps<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>

export interface IProps extends SkillCardProps {
  title: string
}

const SkillCardComponent = (
  { title, ...rest }: IProps,
  ref: React.ForwardedRef<HTMLLIElement>
) => {
  return (
    <li
      className="p-3.5 font-poppins text-base font-semibold text-spanish-gray rounded-md border-2 border-spanish-gray"
      ref={ref}
      {...rest}
    >
      {title}
    </li>
  )
}

export const SkillCard = forwardRef(SkillCardComponent)
