import Card from "@/components/card/card"
import styles from "./user-card.module.scss"
import { ItemGroup } from "@/components/ui/item"
import type { IMemberData } from "@/types/members-data"

interface UserCardProps {
  data: IMemberData
}

export default function UserCard({ data }: UserCardProps) {
  return (
    <>
      <Card className={styles.card} borderRadius={16}>
        <div className={styles.avatar}>
          <p>ФИ</p>
        </div>
        <ItemGroup className={styles.content}>
          <h3>{data.name}</h3>
          <p>{data.email}</p>
        </ItemGroup>
      </Card>
    </>
  )
}
