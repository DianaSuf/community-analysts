import styles from '../layout.module.scss';
import { Button } from "@/components/ui/button"
import { Item } from "@/components/ui/item"

export default function Header() {
  return (
    <header className={styles.layoutBlock}>
      <div className={styles.containerImg}>
        <img src="/img/logo.svg" alt=""/>
      </div>
      <Item>
        <Button variant="outline">
          Подать заявку
        </Button>
        <Button variant="outline">
          Войти в аккаунт
        </Button>
      </Item>
    </header>
  )
}
