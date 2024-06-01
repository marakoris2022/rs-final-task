import styles from './main.module.scss';
import { useEffect, useState } from 'react';
import { CategoryResults, ProductType, getCategories, getProductProjection } from '../../api/catalogue-api';
import { CategoryList } from './categorylist/CategoryList';
import { ProductList } from './categorylist/products/ProductsList';
import { useCategoryStore } from '../../store/useCategoryStore';
import { Breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs';

const getCategoryList = async (): Promise<CategoryResults[] | null> => {
  return await getCategories('key asc');
};

/* const getProductsBySearchWords = async (searchWords: string): Promise<ProductType[] | null> => {
  return await getProductsByText(searchWords);
}; */

const getProductList = async (
  categories: string[],
  releaseYears: string[],
  discount: boolean,
  sortingCriteria: string,
  selectedSortingValue: string,
  minPrice: string,
  maxPrice: string,
  minPositiveCalls: string,
  maxPositiveCalls: string,
  searchWords: string,
): Promise<ProductType[] | null> => {
  console.log('min: ', minPrice, 'max: ', maxPrice);
  return await getProductProjection(
    categories,
    releaseYears,
    discount,
    sortingCriteria,
    selectedSortingValue,
    minPrice,
    maxPrice,
    minPositiveCalls,
    maxPositiveCalls,
    searchWords,
  );
};

export const Catalog = () => {
  const [ctgList, setCtgList] = useState<CategoryResults[] | null>(null);
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const selectedCategories = useCategoryStore((state) => state.categories);
  const selectedReleaseYears = useCategoryStore((state) => state.releaseYears);
  const selectedDiscount = useCategoryStore((state) => state.discount);
  const selectedSortingCriteria = useCategoryStore((state) => state.sortingCriteria);
  const selectedSortingValue = useCategoryStore((state) => state.sortingValue);
  const selectedMinPrice = useCategoryStore((state) => state.minPrice);
  const selectedMaxPrice = useCategoryStore((state) => state.maxPrice);
  const selectedMinPositiveCalls = useCategoryStore((state) => state.minPositiveCalls);
  const selectedMaxPositiveCalls = useCategoryStore((state) => state.maxPositiveCalls);
  const searchWords = useCategoryStore((state) => state.searchWords);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategoryList();
      setCtgList(categories);
    };

    fetchCategories();
  }, []);

  /* useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProductsBySearchWords(searchWords);
      setProducts(productList);
    };

    fetchProducts();
  }, [searchWords]); */

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProductList(
        selectedCategories,
        selectedReleaseYears,
        selectedDiscount,
        selectedSortingCriteria,
        selectedSortingValue,
        selectedMinPrice,
        selectedMaxPrice,
        selectedMinPositiveCalls,
        selectedMaxPositiveCalls,
        searchWords,
      );
      setProducts(productList);
    };

    fetchProducts();
  }, [
    selectedCategories,
    selectedReleaseYears,
    selectedDiscount,
    selectedSortingCriteria,
    selectedMinPrice,
    selectedMaxPrice,
    selectedMinPositiveCalls,
    selectedMaxPositiveCalls,
    searchWords,
    selectedSortingValue,
  ]);

  return (
    <main className={styles.catalog}>
      <Breadcrumbs />
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
