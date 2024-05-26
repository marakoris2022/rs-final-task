import styles from './main.module.scss';
import { useEffect, useState } from 'react';
import { CategoryResults, ProductType, getCategories, getProductsByCategory } from '../../api/catalogue-api';
import { CategoryList } from './categorylist/CategoryList';
import { ProductList } from './categorylist/products/ProductsList';
import { useCategoryStore } from '../../store/useCategoryStore';
import { Breadcrumbs } from './breadcrumbs/Breadcrumbs';

const getCategoryList = async (): Promise<CategoryResults[] | null> => {
  return await getCategories('key asc');
};

const getProductList = async (categories: string[]): Promise<ProductType[] | null> => {
  return await getProductsByCategory(categories);
};

export const Catalog = () => {
  const [ctgList, setCtgList] = useState<CategoryResults[] | null>(null);
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const selectedCategories = useCategoryStore((state) => state.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategoryList();
      setCtgList(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProductList(selectedCategories);
      setProducts(productList);
    };

    fetchProducts();
  }, [selectedCategories]);

  return (
    <main className={styles.catalog}>
      <Breadcrumbs></Breadcrumbs>
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
