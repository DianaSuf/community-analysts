import styles from '../layout.module.scss';
import { Button } from "@/components/ui/button"
import { Item } from "@/components/ui/item"
import { ModalType } from '@/const';
import { useAppDispatch } from '@/hooks';
import { openModal } from '@/store/slices/modal-slice';

export default function Header() {
  const dispatch = useAppDispatch();

  return (
    <header className={styles.layoutBlock}>
      <div className={styles.containerImg}>
        <img src="/img/logo.svg" alt=""/>
      </div>
      <Item>
        <Button onClick={() => dispatch(openModal({type: ModalType.Apply}))} variant="outline">
          Подать заявку
        </Button>
        <Button onClick={() => dispatch(openModal({type: ModalType.Authorization}))} variant="outline">
          Войти в аккаунт
        </Button>
      </Item>
    </header>
  )
}
