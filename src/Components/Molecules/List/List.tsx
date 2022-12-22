import { ListItem } from 'Components/Atoms/ListItem'

interface ListItemProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  subtitle?: string
  onClick?: () => void
}

interface IProps {
  items: ListItemProps[]
}

export const List: React.FC<IProps> = ({ items, ...rest }) => {
  return (
    <ul className="grid grid-cols-1 gap-4" {...rest}>
      {items.map((item) => (
        <ListItem
          key={item.key}
          value={item.value}
          subtitle={item.subtitle}
          onClick={item.onClick}
        />
      ))}
    </ul>
  )
}
