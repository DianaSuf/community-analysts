import { ItemGroup } from "@/components/ui/item";
import { AuthorizationStatus } from "@/const";
import { useAppSelector } from "@/hooks";
import { getAuthorizationStatus } from "@/store/slices/user-slice";
import styles from "./profile-sceen.module.scss"
import NewUserCard from "@/components/card/new-user-card/new-user-card";

export default function ProfileScreen() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      <h1>Профиль</h1>
      {authorizationStatus === AuthorizationStatus.NEW_BID && (
        <ItemGroup className={styles.section}>
          <NewUserCard />
        </ItemGroup>
      )}
    </>
  )
}
