import { Item } from "@/components/ui/item"
import styles from "./card.module.scss"
import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<typeof Item> {
  children: React.ReactNode
}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <Item className={cn(styles.card, className)} {...props}>
      {children}
    </Item>
  )
}

