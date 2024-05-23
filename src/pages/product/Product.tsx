import styles from './product.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductByKey } from '../../api/commers-tools-api';

// productData - is 'any' -> Fix it!

type ProductData = {
  title: string;
};

export const Product = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const [productData, setProductData] = useState<ProductData>({
    title: 'No name',
  });

  async function renderProductData(productKey: string) {
    try {
      const fetchedData = await getProductByKey(productKey);
      const gameName = fetchedData.masterData.current.name.en as string;
      setProductData({
        title: gameName,
      });
    } catch {
      navigate('/NotFoundPage');
    }
  }

  useEffect(() => {
    key && renderProductData(key);
  }, [key]);

  return (
    <div className={styles.productWrapper}>
      <p>Card Data</p>
      <p>Product name: {productData.title}</p>
    </div>
  );
};
