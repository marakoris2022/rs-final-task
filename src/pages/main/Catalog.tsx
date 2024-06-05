import styles from './main.module.scss';
import { useEffect, useState } from 'react';
import { CategoryResults, ProductType, getCategories, getProductProjection } from '../../api/catalogue-api';
import { CategoryList } from './categorylist/CategoryList';
import { ProductList } from './categorylist/products/ProductsList';
import { useCategoryStore } from '../../store/useCategoryStore';
import { Breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs';
import { ModalWindow } from '../../components/modal/ModalWindow';
import { BurgerMenuCatalog } from '../../components/burger-menu-catalog/burgerMenuCatalog';

const getCategoryList = async (): Promise<CategoryResults[] | null> => {
  return await getCategories();
};

const getProductList = async (
  categories: string[],
  movie: boolean,
  discount: boolean,
  sortingCriteria: string,
  selectedSortingValue: string,
  minPrice: string,
  maxPrice: string,
  minPositiveCalls: string,
  maxPositiveCalls: string,
  searchWords: string,
): Promise<ProductType[] | null> => {
  return await getProductProjection(
    categories,
    movie,
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
  const [error, setError] = useState('');

  const selectedCategories = useCategoryStore((state) => state.categories);
  const selectedMovie = useCategoryStore((state) => state.movie);
  const selectedDiscount = useCategoryStore((state) => state.discount);
  const selectedSortingCriteria = useCategoryStore((state) => state.sortingCriteria);
  const selectedSortingValue = useCategoryStore((state) => state.sortingValue);
  const selectedMinPrice = useCategoryStore((state) => state.minPrice);
  const selectedMaxPrice = useCategoryStore((state) => state.maxPrice);
  const selectedMinPositiveCalls = useCategoryStore((state) => state.minPositiveCalls);
  const selectedMaxPositiveCalls = useCategoryStore((state) => state.maxPositiveCalls);
  const searchWords = useCategoryStore((state) => state.searchWords);
  const closeCatalog = useCategoryStore((state) => state.closeCatalog);
  const setCloseCatalog = useCategoryStore((state) => state.setCloseCatalog);

  const handleBurger = () => {
    if (closeCatalog) setCloseCatalog(false);
    else setCloseCatalog(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategoryList();
      setCtgList(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductList(
          selectedCategories,
          selectedMovie,
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          setError(() => errMsg);
        }
      }
    };
    fetchProducts();
  }, [
    selectedCategories,
    selectedMovie,
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
      <div className={styles.navElementsWrapper}>
        <BurgerMenuCatalog onClick={handleBurger} />
        <Breadcrumbs />
      </div>
      <section className={styles.mainSection}>
        <div className={closeCatalog ? styles.blur : `${styles.blur} ${styles.showBlur}`} onClick={handleBurger} />
        <article className={closeCatalog ? styles.formWrapper : `${styles.formWrapper} ${styles.showForm}`}>
          {ctgList ? <CategoryList categoryList={ctgList} /> : <p>Loading...</p>}
        </article>
        <article className={styles.cardsWrapper}>
          {error && <ModalWindow message={error} onClose={() => setError(() => '')} />}
          {products && products.length > 0 ? <ProductList productList={products} /> : <p>Loading...</p>}
        </article>
      </section>
    </main>
  );
};
