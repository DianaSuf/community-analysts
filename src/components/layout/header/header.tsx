import styles from '../layout.module.scss';
import { Button } from "@/components/ui/button"
import { Item } from "@/components/ui/item"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppRoute, AuthorizationStatus, ModalType } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { openModal } from '@/store/slices/modal-slice';
import { getAuthorizationStatus, logoutUser } from '@/store/slices/user-slice';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
             {authorizationStatus === AuthorizationStatus.ADMIN && (
              <NavLink 
                to={AppRoute.Bid}
                className={({ isActive }) => `${styles.navLink} ${!isAccessAllowed ? styles.disabled : ''} ${isActive ? styles.active : ''}`}
                onClick={(e) => !isAccessAllowed && e.preventDefault()}
              >
                Заявки
              </NavLink>
             )}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={styles.avatar}>
                <p>ФИ</p>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className={styles.dropdownMenuText} onClick={() => navigate(AppRoute.Profile)}>
                Личный кабинет
              </DropdownMenuItem>
              <DropdownMenuItem className={styles.dropdownMenuText} onClick={() => dispatch(logoutUser())}>
                Выйти из аккаунта
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Item>
      )}
    </header>
  )
}
