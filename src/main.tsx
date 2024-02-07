import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import { Error as ErrorPage } from './pages/Error/Error';
import Layout from './layout/Layout/Layout.tsx';
import Product from './pages/Product/Product.tsx';
import './index.css';
import axios from '../node_modules/axios/index';
import { PREFIX } from './api/api';

// функция lazy должна импортировать наш компонент
const Menu = lazy(() => import('./pages/Menu/Menu')); // теперь в Menu будет храниться lazy компонент Menu, который будет загружаться не сразу

const router = createBrowserRouter([
  // массив объектов, который описывает наши роуты
  {
    path: '/',
    element: <Layout />,
    children: [
      // дочерние роуты
      {
        path: '/',
        element: (
          <Suspense fallback={<>Загрузка</>}>
            <Menu />
          </Suspense>
        ),
        // Suspense позволяет создать временный обработчик, пока наш компонент загружается
        // благодаря Suspense компонент Menu будет загружен тогда, когда с нми будет взаимодействие
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id', // параметрический роут
        element: <Product />,
        errorElement: <>Error</>, // в случае ошибки подменяет элемент (можем передать компонент), ошибка будет тригериться, если кто-то в loader кидает ошибку (в нашем случае axios выкидывает вверх ошибку)
        loader: async ({ params }) => {
          // имитация задержки
          await new Promise<void>((resolve) => {
            // void ничего не передаем
            setTimeout(() => {
              resolve();
            }, 2000);
          });

          // с помощью params можем получить :id, тоесть params.id
          // loader - функция которая говорит, а как нам загрузить данные перед тем, как загрузить продукт
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Передаем объект, созданный в createBrowserRouter в провайдер: */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
