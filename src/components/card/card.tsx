import { Item } from "@/components/ui/item"
import styles from "./card.module.scss"
import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<typeof Item> {
  children: React.ReactNode
  borderRadius?: number
}

export default function Card({ className, children, borderRadius = 10, ...props }: CardProps) {
  return (
    <Item 
      className={cn(styles.card, className)} 
      style={{ borderRadius: `${borderRadius}px` }}
      {...props}
    >
      {children}
    </Item>
  )
}

