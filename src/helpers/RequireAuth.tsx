import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// компонент, который оборачивает другие компоненты
// если все хорошо, то возвращаем children, если нет, то просто пользователей перенаправляем на авторизацию
function RequireAuth({ children }: { children: ReactNode }) {
  const jwt = localStorage.getItem('jwt'); // null, если нечего нет
  console.log(jwt);
  if (!jwt) {
    // replace - меняем текущий путь
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

export default RequireAuth;
