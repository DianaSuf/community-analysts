import { ItemGroup } from "@/components/ui/item";
import { AuthorizationStatus } from "@/const";
import { useAppSelector } from "@/hooks";
import { getAuthorizationStatus } from "@/store/slices/user-slice";
import styles from "./profile-sceen.module.scss"
import NewBidCard from "@/components/card/new-bid-card/new-bid-card";
import RejectedBidCard from "@/components/card/rejected-bid-card/rejected-bid-card";

export default function ProfileScreen() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      <h1>Профиль</h1>
      {authorizationStatus === AuthorizationStatus.NEW_BID && (
        <ItemGroup className={styles.section}>
          <NewBidCard />
        </ItemGroup>
      )}
      {authorizationStatus === AuthorizationStatus.REJECTED_BID && (
        <ItemGroup className={styles.section}>
          <RejectedBidCard />
        </ItemGroup>
      )}
    </>
  )
}
