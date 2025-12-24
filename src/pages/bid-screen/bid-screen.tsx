import { useEffect } from "react"
import { ItemGroup } from "@/components/ui/item"
import styles from "./bid-screen.module.scss"
import BidCard from "@/components/card/bid/bid-card"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { fetchBidsAction } from "@/store/api-actions"
import { getNewBids, getRejectedBids } from "@/store/slices/bid-slice"

export default function BidScreen() {
  const dispatch = useAppDispatch()
  const newBids = useAppSelector(getNewBids)
  const rejectedBids = useAppSelector(getRejectedBids)

  useEffect(() => {
    dispatch(fetchBidsAction())
  }, [dispatch])

  return (
    <>
      <ItemGroup className={styles.section}>
        <div className={styles.title}>
          <h1>Новые заявки</h1>
          <p className={styles.count}>{newBids.length}</p>
        </div>
        <div className={styles.block}>
          {newBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
        </div>
      </ItemGroup>
      <ItemGroup className={styles.section}>
        <div className={styles.title}>
          <h1>Отклонённые заявки</h1>
          <p className={styles.count}>{rejectedBids.length}</p>
        </div>
        <div className={styles.block}>
          {rejectedBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
        </div>
      </ItemGroup>
    </>
  )
}
