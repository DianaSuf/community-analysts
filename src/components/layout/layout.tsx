import Header from './header/header';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Footer from './footer/footer';
import ManagerModals from '../modals/modalManager';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.outlet}>
          <Outlet />
          <ManagerModals />
        </div>
      </main>
      <Footer />
    </>
  );
}
