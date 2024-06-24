import styles from './main.module.scss';
import { useEffect, useState } from 'react';
import {
  CategoryResults,
  ProductProps,
  ProductType,
  getCategories,
  getProductProjection,
} from '../../api/catalogue-api';
import { CategoryList } from './categorylist/CategoryList';
import { ProductList } from './categorylist/products/ProductsList';
import { useCategoryStore } from '../../store/useCategoryStore';
import { Breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs';
import { ModalWindow } from '../../components/modal/ModalWindow';
import { BurgerMenuCatalog } from '../../components/burger-menu-catalog/burgerMenuCatalog';
import Pagination from '../../components/pagination/Pagination';
import { Loading } from '../../components/loading/Loading';
import { PromoCode } from '../../components/promo/PromoCode';
import CardSkeleton from '../../components/skeleton/CardSkeleton';

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
  searchWordsForFetching: string,
  offset: number,
  limit: number,
): Promise<ProductProps | null> => {
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
    searchWordsForFetching,
    offset,
    limit,
  );
};

export const Catalog = () => {
  const [ctgList, setCtgList] = useState<CategoryResults[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
  const searchWordsForFetching = useCategoryStore((state) => state.searchWordsForFetching);
  const closeCatalog = useCategoryStore((state) => state.closeCatalog);
  const setCloseCatalog = useCategoryStore((state) => state.setCloseCatalog);
  const limit = useCategoryStore((state) => state.limit);
  const offset = useCategoryStore((state) => state.offset);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const handleBurger = () => {
    if (closeCatalog) {
      setCloseCatalog(false);
    } else {
      setCloseCatalog(true);
    }
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
        setLoading(true);
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
          searchWordsForFetching,
          offset,
          limit,
        );
        if (productList) {
          setLastPage(Math.ceil(productList.total / limit));
          setProducts(productList.results);
          window.scrollTo(0, 0);
          setLoading(false);
        }
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
    searchWordsForFetching,
    selectedSortingValue,
    offset,
    limit,
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
          {ctgList ? <CategoryList categoryList={ctgList} setCurrentPage={setCurrentPage} /> : <Loading />}
        </article>
        <article className={styles.cardsWrapper}>
          <PromoCode />
          {error && <ModalWindow message={error} onClose={() => setError(() => '')} />}
          {loading ? (
            [...new Array(6)].map((_item, id) => <CardSkeleton key={id} />)
          ) : (
            <ProductList productList={products} />
          )}
          {/*  {!loading && products && products.length > 0 ? <ProductList productList={products} /> : <Loading />} */}
          {!loading && (
            <div className={styles.paginationContainer}>
              <Pagination currentPage={currentPage} lastPage={lastPage} maxLength={7} setCurrentPage={setCurrentPage} />
            </div>
          )}
        </article>
      </section>
    </main>
  );
};
