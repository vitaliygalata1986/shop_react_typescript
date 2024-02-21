import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import AuthLayout from './layout/Auth/AuthLayout';
import MenuLayout from './layout/MenuLayout/MenuLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Product from './pages/Product/Product';
import { Error as ErrorPage } from './pages/Error/Error';
import './index.css';
import axios from '../node_modules/axios/index';
import { PREFIX } from './api/api';
import RequireAuth from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';

// функция lazy должна импортировать наш компонент
const Menu = lazy(() => import('./pages/Menu/Menu')); // теперь в Menu будет храниться lazy компонент Menu, который будет загружаться не сразу

const router = createBrowserRouter([
  // массив объектов, который описывает наши роуты
  {
    path: '/',
    element: (
      <RequireAuth>
        <MenuLayout />
      </RequireAuth>
    ),
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
        // после бандла наше приложение будет разбито на различные js файлы
        // вобщем технология Suspense используется для ленивой загрузки компонента
        // даже для API запросов
        // loader больше всего птходит для того, чтобы данные загрузить в зависимости от params: path: '/product/:id'
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id', // параметрический роут
        element: <Product />,
        errorElement: <>Error Ошибка</>, // в случае ошибки подменяет элемент (можем передать компонент), ошибка будет тригериться, если кто-то в loader кидает ошибку (в нашем случае axios выкидывает вверх ошибку)
        loader: async ({ params }) => {
          // обработаем состояние загрузки
          // defer позволяет обеспечить реализацию некого API отложенной загрузки с помощью Suspense

          /*
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .get(`${PREFIX}/productsd/${params.id}`)
                  .then((data) => resolve(data))
                  .catch((e) => reject(e));
              }, 2000);
            }),
          });
          */

          return defer({
            // вовзращаем промис, тоесть получили результирующие данные
            // defer оборачивает данные, которые сами по себе являются асинхронными
            data: await axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((data) => data), // первый элемент нашего defer, который возвращается из промиса
          });

          // имитация задержки
          /*
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
          */
        },
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },

      {
        path: 'register',
        element: <Register />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
