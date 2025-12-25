import Card from "@/components/card/card"
import styles from "./user-card.module.scss"
import { ItemGroup } from "@/components/ui/item"

export default function UserCard() {
  return (
    <>
      <Card className={styles.card} borderRadius={16}>
        <div className={styles.avatar}>
          <p>ФИ</p>
        </div>
        <ItemGroup className={styles.content}>
          <h3>ИМЯ</h3>
          <p>ПОЧТА</p>
        </ItemGroup>
      </Card>
    </>
  )
}
