import { useCallback, useEffect, useState } from 'react';
import styles from './card.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductType, getProductByKey } from '../../../../../api/catalogue-api';
import { Button } from '../../../../../components/button/Button';
import { ModalWindow } from '../../../../../components/modal/ModalWindow';

type CardType = {
  product: ProductType;
};

export const ProductCard = ({ product }: CardType) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [imageURL, setImageUrl] = useState('');
  const [price, setPrice] = useState(0.0);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    /* const { attributes } = product.masterData.current.masterVariant;
    const found = attributes.find((attr) => attr.name === 'screenshots');
    if (found && typeof found.value === 'string') {
      const foundURL = found.value.match(/\bhttps:\/\/[^"\s]+/i);
      if (foundURL && foundURL.length > 0) {
        setImageUrl(foundURL[0]);
      } else {
        setImageUrl('./default-card-background.jpg');
      }
    } else {
      setImageUrl('./default-card-background.jpg');
    } */
    const { url } = product.masterVariant.images[0];
    if (url) {
      setImageUrl(url);
    } else {
      setImageUrl('./default-card-background.jpg');
    }
    const { value } = product.masterVariant.prices[0];
    setPrice(value.centAmount / 10 ** value.fractionDigits);
    setCurrency(value.currencyCode);
  }, [product]);

  const clickHandle = useCallback(async () => {
    try {
      const productItem = await getProductByKey(product.key);

      if (productItem) {
        navigate(`/catalog/${productItem.key}`);
      } else {
        throw new Error('Not found');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errMsg = err.message;
        setError(() => errMsg);
      }
    }
  }, [navigate, product.key]);

  return (
    <div className={styles.card}>
      <Button style={styles.cardBtn} title="Info" type="button" onClick={clickHandle}></Button>
      <h2 className={styles.cardTitle}>{product.name['en-US']}</h2>
      <div className={styles.cardContainer} style={{ backgroundImage: `url(${imageURL})` }}>
        <div className={styles.cardDescriptionContainer}>
          <p className={styles.cardDescription}> {product.description['en-US']}</p>
        </div>
      </div>
      <div className={styles.priceInfo}>
        <span style={{ marginRight: '5px' }}>{price}</span>
        <span>{currency}</span>
      </div>
      {error && <ModalWindow message={error} onClose={() => setError(() => '')} />}
    </div>
  );
};
