import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
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
