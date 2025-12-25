import { Item, ItemGroup } from "@/components/ui/item";
import styles from "./members-screen.module.scss"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import UserCard from "@/components/card/user-card/user-card";

export default function MembersScreen() {
  return (
    <>
      <ItemGroup className={styles.section}>
        <Item className={styles.title}>
          <h1>Участники сообщества</h1>
        </Item>
        <InputGroup className={styles.input}>
          <InputGroupInput placeholder="Поиск" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <ItemGroup className={styles.block}>
          <UserCard />
        </ItemGroup>
      </ItemGroup>
    </>
  )
}
