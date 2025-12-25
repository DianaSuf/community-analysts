import Card from "@/components/card/card"
import styles from "./new-bid-card.module.scss"

export default function NewBidCard() {
  return (
    <>
      <Card className={styles.card} borderRadius={10}>
        <p>Ваша заявка на участие в сообществе находится на рассмотрении. Вы успешно вошли в систему, однако доступ к полному функционалу сайта будет открыт после подтверждения вашей заявки администратором сообщества.</p>
        <h4>Пожалуйста, ожидайте</h4>
      </Card>
    </>
  )
}
