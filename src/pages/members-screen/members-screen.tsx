import { Item, ItemGroup } from "@/components/ui/item";
import styles from "./members-screen.module.scss"

export default function MembersScreen() {
  return (
    <>
      <ItemGroup className={styles.section}>
        <Item className={styles.title}>
          <h1>Участники сообщества</h1>
        </Item>
      </ItemGroup>
    </>
  )
}
