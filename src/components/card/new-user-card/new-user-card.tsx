import Card from "@/components/card/card"
import styles from "./new-user-card.module.scss"

export default function NewUserCard() {
  return (
    <>
      <Card className={styles.card}>
        <p>Ваша заявка на участие в сообществе находится на рассмотрении. Вы успешно вошли в систему, однако доступ к полному функционалу сайта будет открыт после подтверждения вашей заявки администратором сообщества.</p>
        <h4>Пожалуйста, ожидайте</h4>
      </Card>
    </>
  )
}
