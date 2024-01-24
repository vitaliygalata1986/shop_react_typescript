import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Menu.module.css';

function Menu() {
  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <Search type="search" placeholder="Введите блюдо или состав" />
      </div>
      <div>
        <ProductCard
          id={1}
          title="Наслаждение"
          price={300}
          description="Салями, руккола, помидоры, оливки"
          image={'product-demo.png'}
          rating="4.5"
        />
      </div>
    </>
  );
}

export default Menu;
