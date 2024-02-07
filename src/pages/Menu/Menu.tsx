import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { PREFIX } from '../../api/api';
import { Product } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import MenuList from './MenuList/MenuList';
import axios from '../../../node_modules/axios/index';

function Menu() {
  const [products, setProducts] = useState<Product[]>([]); // типизируем массив продуктов -  используем интерфейс <Product[]>
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getMenu = async () => {
    try {
      setIsLoading(true);

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
        {!isLoading && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты</>}
      </div>
    </>
  );
}

export default Menu;
