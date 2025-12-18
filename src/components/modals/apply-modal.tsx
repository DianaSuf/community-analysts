import styles from './modals.module.scss';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Item } from "@/components/ui/item"
import { useAppDispatch } from '../../hooks';
import { registerAction } from '../../store/api-actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { openModal } from '@/store/slices/modal-slice';
import { ModalType } from '@/const';

interface ApplyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApplyModal({ open, onOpenChange }: ApplyModalProps) {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: { name: string; email: string; password: string; position: string }) => {
    try {
      await dispatch(registerAction({
        name: values.name, 
        email: values.email, 
        password: values.password,
        position: values.position,
      })).unwrap();
      dispatch(openModal({type: ModalType.Authorization}))
    } catch (error) {
      console.error('Ошибка подачи заявки:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      position: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Имя и фамилия обязательны'),
      email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),
      password: Yup.string()
        .min(6, 'Пароль должен содержать хотя бы 6 символов')
        .required('Пароль обязателен'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно'),
      position: Yup.string().required('Должность обязательна'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={styles.modal}>
        <DialogHeader className={styles.header}>
          <DialogTitle>Подать заявку на вступление</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <Item>
            <Label htmlFor="name">ФИО</Label>
            <Input 
              id="name" 
              name="name"
              placeholder="ФИО"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <span className={styles.error}>{formik.errors.name}</span>
            )}
          </Item>
          <Item>
            <Label htmlFor="position">Должность</Label>
            <Input 
              id="position" 
              name="position"
              placeholder="Ваша должность в компании"
              value={formik.values.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.position && formik.errors.position && (
              <span className={styles.error}>{formik.errors.position}</span>
            )}
          </Item>
          <Item>
            <Label htmlFor="email">Почта</Label>
            <Input 
              type="email" 
              id="email" 
              name="email"
              placeholder="Ваша почта"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <span className={styles.error}>{formik.errors.email}</span>
            )}
          </Item>
          <Item>
            <Label htmlFor="password">Пароль</Label>
            <Input 
              type="password" 
              id="password" 
              name="password"
              placeholder="Придумайте пароль"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <span className={styles.error}>{formik.errors.password}</span>
            )}
          </Item>
          <Item>
            <Label htmlFor="confirmPassword">Повторите пароль</Label>
            <Input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <span className={styles.error}>{formik.errors.confirmPassword}</span>
            )}
          </Item>
          <Item>
            <Button type="submit" className={styles.button} disabled={formik.isSubmitting}>
              Подать заявку
            </Button>
          </Item>
        </form>
        <Button variant="ghost" className={styles.text} onClick={() => dispatch(openModal({type: ModalType.Authorization}))}>У меня уже есть аккаунт</Button>
      </DialogContent>
    </Dialog>
  )
}
