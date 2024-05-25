import styles from './main.module.scss';
import { Button } from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategoryResults, ProductType, getCategories, getProductsByCategory } from '../../api/catalogue-api';
import { CategoryList } from './categorylist/CategoryList';
import { ProductList } from './categorylist/products/ProductsList';

const getCategoryList = async (): Promise<CategoryResults[] | null> => {
  return await getCategories('key asc');
};

const getProductList = async (): Promise<ProductType[] | null> => {
  return await getProductsByCategory();
};

export const Main = () => {
  const navigate = useNavigate();
  const [ctgList, setCtgList] = useState<CategoryResults[] | null>(null);
  const [products, setProducts] = useState<ProductType[] | null>(null);
  /*  const storedCategories = useStore((state) => state.categories); */

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategoryList();
      setCtgList(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProductList();
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <main className={styles.catalog}>
      <nav className={styles.navigate}>
        <Button style={styles.navBtn} onClick={() => navigate('/')} title={'Main'} />
        <Button style={styles.navBtn} onClick={() => navigate('/login')} title={'Login'} />
        <Button style={styles.navBtn} onClick={() => navigate('/registration')} title={'Registration'} />
      </nav>
      <section className={styles.mainSection}>
        <article className={styles.formWrapper}>
          {ctgList ? <CategoryList categoryList={ctgList} /> : <p>Loading...</p>}
        </article>
        <article className={styles.cardsWrapper}>
          {products ? <ProductList productList={products} /> : <p>Loading...</p>}
        </article>
      </section>
    </main>
  );
};
