import styles from '../layout.module.scss';
import { Button } from "@/components/ui/button"
import { Item } from "@/components/ui/item"
import { AppRoute, AuthorizationStatus, ModalType } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { openModal } from '@/store/slices/modal-slice';
import { getAuthorizationStatus } from '@/store/slices/user-slice';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAccessAllowed = authorizationStatus === AuthorizationStatus.USER || authorizationStatus === AuthorizationStatus.ADMIN;

  return (
    <header className={styles.layoutBlock}>
      <Item>
        <Link className={styles.containerImg} to={AppRoute.Main}>
          <img src="/img/logo.svg" alt=""/>
        </Link>
        {!(authorizationStatus === AuthorizationStatus.UNKNOWN) && (
          <Item>
            <NavLink 
              to={AppRoute.Main}
              end
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              Главная
            </NavLink>
            <NavLink 
              to={AppRoute.Members}
              className={({ isActive }) => `${styles.navLink} ${!isAccessAllowed ? styles.disabled : ''} ${isActive ? styles.active : ''}`}
              onClick={(e) => !isAccessAllowed && e.preventDefault()}
            >
              Участники сообщества
            </NavLink>
            <NavLink 
              to={AppRoute.Events}
              className={({ isActive }) => `${styles.navLink} ${!isAccessAllowed ? styles.disabled : ''} ${isActive ? styles.active : ''}`}
              onClick={(e) => !isAccessAllowed && e.preventDefault()}
            >
              Мероприятия
            </NavLink>
          </Item>
        )}
      </Item>
      {authorizationStatus === AuthorizationStatus.UNKNOWN && (
        <Item>
          <Button onClick={() => dispatch(openModal({type: ModalType.Apply}))} variant="outline">
            Подать заявку
          </Button>
          <Button onClick={() => dispatch(openModal({type: ModalType.Authorization}))} variant="outline">
            Войти в аккаунт
          </Button>
        </Item>
      )}
      {!(authorizationStatus === AuthorizationStatus.UNKNOWN) && (
        <Item>
          <Link className={styles.avatar} to={AppRoute.Profile}>
            <p>ФИ</p>
          </Link>
        </Item>
      )}
    </header>
  )
}
