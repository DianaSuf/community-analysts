import styles from './modals.module.scss';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Item } from "@/components/ui/item"
import { useAppDispatch } from '../../hooks';
import { closeModal, openModal } from '@/store/slices/modal-slice';
import { AppRoute, ModalType } from '@/const';
import { loginAction } from '@/store/api-actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface AuthorizationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthorizationModal({ open, onOpenChange }: AuthorizationModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
    const handleSubmit = async (values: { email: string; password: string; }) => {
      try {
        await dispatch(loginAction({
          email: values.email,
          password: values.password,
        })).unwrap();
        dispatch(closeModal())
        navigate(AppRoute.Profile);
      } catch (error) {
        console.error('Ошибка подачи заявки:', error);
      }
    };
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),
      password: Yup.string()
        .min(6, 'Пароль должен содержать хотя бы 6 символов')
        .required('Пароль обязателен'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={styles.modal}>
        <DialogHeader className={styles.header}>
          <DialogTitle>Авторизация</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
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
              placeholder="Ваш пароль" 
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <span className={styles.error}>{formik.errors.password}</span>
            )}
          </Item>
          <Item>
            <Button type="submit" className={styles.button}>
              Авторизоваться
            </Button>
          </Item>
        </form>
        <Button variant="ghost" className={styles.text} onClick={() => dispatch(openModal({type: ModalType.Apply}))}>У меня ещё нет аккаунта</Button>
      </DialogContent>
    </Dialog>
  )
}
