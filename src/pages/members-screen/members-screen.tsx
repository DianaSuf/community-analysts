import { useState, useEffect } from "react";
import { Item, ItemGroup } from "@/components/ui/item";
import styles from "./members-screen.module.scss"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import UserCard from "@/components/card/user-card/user-card";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchMembersAction } from "@/store/api-actions"
import { getMembers, getMembersCount } from "@/store/slices/members-slice"

export default function MembersScreen() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const users = useAppSelector(getMembers);
  const count = useAppSelector(getMembersCount);

  useEffect(() => {
    dispatch(fetchMembersAction({ search: searchQuery }));
  }, [dispatch, searchQuery]);

  return (
    <>
      <ItemGroup className={styles.section}>
        <Item className={styles.title}>
          <h1>Участники сообщества</h1>
          <p>{count}</p>
        </Item>
        <InputGroup className={styles.input}>
          <InputGroupInput 
            placeholder="Поиск" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <ItemGroup className={styles.block}>
          {users.map((user) => (
            <UserCard key={user.id} data={user} />
          ))}
        </ItemGroup>
      </ItemGroup>
    </>
  )
}
