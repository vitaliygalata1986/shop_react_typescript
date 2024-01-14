import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <div>
        <Link to="/">Меню</Link>
        <Link to="/cart">Корзина</Link>
      </div>
      <div>
        {/* сюда будет подставляться вложенная страница */}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
