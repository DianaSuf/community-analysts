import styles from './modals.module.scss';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Item } from "@/components/ui/item"

interface ApplyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitch: () => void
}

export function ApplyModal({ open, onOpenChange, onSwitch }: ApplyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={styles.modal}>
        <DialogHeader className={styles.header}>
          <DialogTitle>Подать заявку на вступление</DialogTitle>
        </DialogHeader>
        <form>
          <Item>
            <Label htmlFor="name">ФИО</Label>
            <Input id="name" placeholder="ФИО" />
          </Item>
          <Item>
            <Label htmlFor="job">Должность</Label>
            <Input id="job" placeholder="Ваша должность в компании" />
          </Item>
          <Item>
            <Label htmlFor="email">Почта</Label>
            <Input type="email" id="email" placeholder="Ваша почта" />
          </Item>
          <Item>
            <Label htmlFor="password">Пароль</Label>
            <Input type="password" id="password" placeholder="Придумайте пароль" />
          </Item>
          <Item>
            <Label htmlFor="password">Пароль</Label>
            <Input type="password" id="password" placeholder="Повторите пароль" />
          </Item>
          <Item>
            <Button type="submit" className={styles.button}>
              Подать заявку
            </Button>
          </Item>
        </form>
        <Button variant="ghost" className={styles.text} onClick={onSwitch}>У меня уже есть аккаунт</Button>
      </DialogContent>
    </Dialog>
  )
}
