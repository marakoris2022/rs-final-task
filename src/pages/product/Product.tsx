import styles from './product.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductByKey } from '../../api/commers-tools-api';

// fetchedData - is 'any' -> fix it?

type ProductData = {
  title: string;
  description: string;
  imageTitle: string;
};

export const Product = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const [productData, setProductData] = useState<ProductData>({
    title: 'No data',
    description: 'No data',
    imageTitle: 'No data',
  });

  async function renderProductData(productKey: string) {
    try {
      const fetchedData = await getProductByKey(productKey);
      console.log(fetchedData);

      const title = fetchedData.masterData.current.name.en as string;
      const description = fetchedData.masterData.current.description['en-US'] as string;
      const imageTitle = fetchedData.masterData.current.masterVariant.images[0].url as string;

      setProductData({
        title,
        description,
        imageTitle,
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
      <div>
        <img src={productData.imageTitle} alt="Game Image" />
      </div>
      <p>Product name: {productData.title}</p>
      <p>Description: {productData.description}</p>
    </div>
  );
};
