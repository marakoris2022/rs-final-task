import { ProductType } from '../../../../api/catalogue-api';
import { ProductCard } from './card/ProductCard';
import styles from './products.module.scss';

type ProductListType = {
  productList: ProductType[] | null;
};

export const ProductList = ({ productList }: ProductListType) => {
  return (
    <div className={styles.container}>
      {productList && productList.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
};
