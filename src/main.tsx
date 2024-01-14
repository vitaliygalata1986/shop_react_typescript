import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Error from './pages/Error/Error';
import Layout from './layout/Menu/Menu.tsx';
import './index.css';

const router = createBrowserRouter([
  // массив объектов, который описывает наши роуты
  {
    path: '/',
    element: <Layout />,
    children: [
      // дочерние роуты
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Передаем объект, созданный в createBrowserRouter в провайдер: */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
