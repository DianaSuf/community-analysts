import Card from "@/components/card/card"
import styles from "./rejected-bid-card.module.scss"

export default function RejectedBidCard() {
  return (
    <>
      <Card className={styles.card} padding="2.4rem">
        <p>Ваша заявка на участие в сообществе находится на рассмотрении. Вы успешно вошли в систему, однако доступ к полному функционалу сайта будет открыт после подтверждения вашей заявки администратором сообщества.</p>
        <h4>БАН</h4>
      </Card>
    </>
  )
}
