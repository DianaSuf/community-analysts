import Home from "@/components/main/home/home"
import Mission from "@/components/main/mission/mission"
import { useAppSelector } from "@/hooks";
import { getAuthorizationStatus } from "@/store/slices/user-slice";

export default function MainScreen() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      <Home authorizationStatus={authorizationStatus} />
      <Mission />
    </>
  )
}
