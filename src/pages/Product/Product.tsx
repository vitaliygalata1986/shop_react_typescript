// import { useParams } from 'react-router-dom';
import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

function Product() {
  /*
  const params = useParams();
  const id = params.id;
  console.log(params); // {id: '1'}
  console.log(id);
  */

  // const { id } = useParams();
  const data = useLoaderData() as { data: Product }; // получение данных из loader - обеспечивает более простую работу с состояниями нашей загрузки, т.е. мы получаем defer из объекта data
  // и также обработку ошибок
  // приведем data явно к продукту
  // Await - компонент, обеспечивающий реализацию Suspense API, тоесть обеспечиваем загрузку данных для роута, который ждет пока у нас развезолвится промис <Await resolve={data.data}>
  // и тогда мы получаем результирующий элемент
  /*
    {({ data }: { data: Product }) => {
            <>Product - {data.name}</>;
          }}
  */
  // resolve - что мы должны вернуть
  // внутрь принимаем функцию стрелку, которая и вернет нам результат
  // data  ({data}: { data: Product })=>{( приходит только тогда, когда промис развезолвится
  return (
    // но пока данные не получили, нужно что-то показать
    <>
      <Suspense fallback={'Загружаем'}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => <>Product - {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
}

export default Product;
