import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Menu.module.css';
import { PREFIX } from '../../api/api';
import { Product } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';

function Menu() {
  const [products, setProducts] = useState<Product[]>([]); // типизируем массив продуктов -  используем интерфейс <Product[]>
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getMenu = async () => {
    try {
      setIsLoading(true);
      // имитация задержки
      await new Promise<void>((resolve) => {
        // void ничего не передаем
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      const { data } = await axios.get<Product[]>(`${PREFIX}/products/`); // axios хорошо дружит с типизацией, здесь используем дженерик - массив продуктов
      // если будет ошибка, то axios выкенит ошибку
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      return;
    }
    /*
    try {
      const res = await fetch(`${PREFIX}/products/`);
      if (!res.ok) {
        return;
      }
      const data = (await res.json()) as Product[];
      setProducts(data);
    } catch (e) {
      console.error(e);
      return;
    }
*/
  };
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <Search type="search" placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {!isLoading &&
          products.map((product) => (
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
        {isLoading && <>Загружаем продукты</>}
      </div>
    </>
  );
}

export default Menu;
