import { Item } from "@/components/ui/item"
import styles from "./card.module.scss"
import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<typeof Item> {
  children: React.ReactNode
  borderRadius?: number
  padding?: string | number
}

export default function Card({ className, children, borderRadius = 1, padding = '2rem', ...props }: CardProps) {
  return (
    <Item 
      className={cn(styles.card, className)} 
      style={{ borderRadius: `${borderRadius}rem`, padding: `${padding}` }}
      {...props}
    >
      {children}
    </Item>
  )
}

