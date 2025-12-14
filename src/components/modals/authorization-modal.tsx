import styles from './modals.module.scss';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Item } from "@/components/ui/item"

interface AuthorizationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitch: () => void
}

export function AuthorizationModal({ open, onOpenChange, onSwitch }: AuthorizationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={styles.modal}>
        <DialogHeader className={styles.header}>
          <DialogTitle>Авторизация</DialogTitle>
        </DialogHeader>
        <form>
          <Item>
            <Label htmlFor="email">Почта</Label>
            <Input type="email" id="email" placeholder="Ваша почта" />
          </Item>
          <Item>
            <Label htmlFor="password">Пароль</Label>
            <Input type="password" id="password" placeholder="Ваш пароль" />
          </Item>
          <Item>
            <Button type="submit" className={styles.button}>
              Авторизоваться
            </Button>
          </Item>
        </form>
        <Button variant="ghost" className={styles.text} onClick={onSwitch}>У меня ещё нет аккаунта</Button>
      </DialogContent>
    </Dialog>
  )
}
