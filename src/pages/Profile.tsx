import NewUser from "@/components/profile/new-user/new-user";
import { AuthorizationStatus } from "@/const";
import { useAppSelector } from "@/hooks";
import { getAuthorizationStatus } from "@/store/slices/user-slice";

export default function ProfileScreen() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      <h1>Профиль</h1>
      {authorizationStatus === AuthorizationStatus.NEW_BID && (
        <NewUser />
      )}
    </>
  )
}
