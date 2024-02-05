// import { useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';

function Product() {
  /*
  const params = useParams();
  const id = params.id;
  console.log(params); // {id: '1'}
  console.log(id);
  */

  // const { id } = useParams();
  const data = useLoaderData() as Product; // получение данных их loader - обеспечивает более простую работу с состояниями нашей загрузки
  // и также обработку ошибок
  // приведем data явно к продукту

  return <div>Product - {data.name}</div>;
}

export default Product;
