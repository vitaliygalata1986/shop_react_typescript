import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

function MenuList({ products }: MenuListProps) {
  return products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      description={product.ingredients.join(', ')}
      image={product.image}
      rating={product.rating}
    />
  ));
}

export default MenuList;
