import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

function Layout() {
  return (
    <main className={styles['main-layout']}>
      <div className={styles['main-layout__left']}>
        <div className={styles['main-layout__user']}>
          <img
            className={styles['main-layout__avatar']}
            src="./avatar.png"
            alt="avatar"
          />
          <div className={styles['main-layout__user-info']}>Галата Виталий</div>
          <a
            href="mailto:nertis44@gmail.com"
            className={styles['main-layout__user-email']}
          >
            nertis44@gmail.com
          </a>
        </div>
        <nav className={styles['main-layout__navigation']}>
          <Link to="/" className={styles['main-layout__navigation-link']}>
            <img src="./menu-icon.svg" alt="menu-icon" />
            Меню
          </Link>
          <Link to="/cart" className={styles['main-layout__navigation-link']}>
            <img src="./cart-icon.svg" alt="cart-icon" />
            Корзина
          </Link>
        </nav>
        <Button className={styles['main-layout__logout']}>
          <img src="./logout.svg" alt="Выйти" />
          Выйти
        </Button>
      </div>
      <div className={styles['main-layout__right']}>
        {/* сюда будет подставляться вложенная страница */}
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
