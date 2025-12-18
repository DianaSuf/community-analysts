import { Item, ItemGroup } from "@/components/ui/item"
import styles from "./new-user.module.scss"

export default function NewUser() {
  return (
    <>
      <ItemGroup className={styles.section}>
        <Item className={styles.card}>
          <p>Ваша заявка на участие в сообществе находится на рассмотрении. Вы успешно вошли в систему, однако доступ к полному функционалу сайта будет открыт после подтверждения вашей заявки администратором сообщества.</p>
          <h4>Пожалуйста, ожидайте</h4>
        </Item>
      </ItemGroup>
    </>
  )
}
