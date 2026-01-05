import Card from "@/components/card/card"
import { Button } from "@/components/ui/button"
import { Item, ItemGroup } from "@/components/ui/item"
import type { IBid, IRejectedBid } from "@/types/bid-data"
import { BidConst, type BidType, AuthorizationStatus } from "@/const"
import { useAppDispatch } from "@/hooks"
import { fetchBidsAction, updateRoleAction } from "@/store/api-actions"
import styles from "./bid-card.module.scss"

interface BidCardProps {
  bid: IBid | IRejectedBid
  type: BidType
}

export default function BidCard({ bid, type }: BidCardProps) {
  const dispatch = useAppDispatch()

  const handleReject = async () => {
    try {
      await dispatch(updateRoleAction({ idUser: bid.id, role: AuthorizationStatus.REJECTED_BID })).unwrap()
      dispatch(fetchBidsAction())
    } catch (error) {
      console.error('Ошибка при отклонении заявки:', error)
    }
  }

  const handleAccept = async () => {
    try {
      await dispatch(updateRoleAction({ idUser: bid.id, role: AuthorizationStatus.USER })).unwrap()
      dispatch(fetchBidsAction())
    } catch (error) {
      console.error('Ошибка при принятии заявки:', error)
    }
  }

  return (
    <>
      <Card className={styles.section} borderRadius={16}>
        <h4>{bid.name}</h4>
        <ItemGroup className={styles.block}>
          <Item className={styles.title}>
            {bid.position && <p>Должность:</p>}
            {bid.company && <p>Компания:</p>}
            {bid.email && <p>Почта:</p>}
          </Item>
          <Item className={styles.text}>
            {bid.position && <p>{bid.position}</p>}
            {bid.company && <p className={styles.link}>{bid.company}</p>}
            {bid.email && <p className={styles.link}>{bid.email}</p>}
          </Item>
        </ItemGroup>
        {type === BidConst.Rejected && (bid as IRejectedBid).reason && (
          <ItemGroup className={styles.rejected}>
            <p>Причина:</p>
            <p>{(bid as IRejectedBid).reason}</p>
          </ItemGroup>
        )}
        <ItemGroup className={`${styles.buttons} ${type === BidConst.Rejected ? styles.buttonsSingle : ''}`}>
          {type === BidConst.New && (
            <Button variant='outline' onClick={handleReject}>
              Отклонить
            </Button>
          )}
          <Button className={styles.accept} onClick={handleAccept}>
            Принять
          </Button>
        </ItemGroup>
      </Card>
    </>
  )
}
