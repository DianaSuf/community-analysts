import styles from './modals.module.scss';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Item } from "@/components/ui/item"
import { Textarea } from '../ui/textarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { closeModal } from '@/store/slices/modal-slice';
import { useAppDispatch } from '@/hooks';

interface ReasonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (reason: string) => void
}

export function ReasonModal({ open, onOpenChange, onSubmit }: ReasonModalProps) {
  const dispatch = useAppDispatch();
  
  const handleSubmit = (values: { reason: string }) => {
    if (onSubmit) {
      onSubmit(values.reason)
    }
    formik.resetForm()
    onOpenChange(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      formik.resetForm()
    }
    onOpenChange(isOpen)
  }

  const formik = useFormik({
    initialValues: {
      reason: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      reason: Yup.string().required('Причина обязательна'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className={`${styles.modal} ${styles.modalReason}`}>
        <DialogHeader className={styles.header}>
          <DialogTitle>Отказ</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <Item>
            <Label htmlFor="reason">Объясните причину отказа</Label>
            <Textarea 
              id="reason" 
              name="reason"
              placeholder="Укажите причину отказа"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.reason && formik.errors.reason && (
              <span className={styles.error}>{formik.errors.reason}</span>
            )}
          </Item>
          <Item className={styles.buttonBlock}>
            <Button className={`${styles.button} ${styles.buttonСancel}`} onClick={() => dispatch(closeModal())}>
              Отмена
            </Button>
            <Button type="submit" className={styles.button}>
              Отказать
            </Button>
          </Item>
        </form>
      </DialogContent>
    </Dialog>
  )
}
