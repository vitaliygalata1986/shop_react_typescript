import { useParams } from 'react-router-dom';

function Product() {
  /*
  const params = useParams();
  const id = params.id;
  console.log(params); // {id: '1'}
  console.log(id);
  */

  const { id } = useParams();

  return <div>Product - {id}</div>;
}

export default Product;
