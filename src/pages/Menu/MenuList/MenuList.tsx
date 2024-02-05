import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          description={product.ingredients.join(', ')}
          image={product.image}
          rating={product.rating}
        />
      ))}
    </div>
  );
}

export default MenuList;
