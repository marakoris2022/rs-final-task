import { useCallback, useEffect, useState } from 'react';
import styles from './card.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductType, getProductByKey } from '../../../../../api/catalogue-api';
import { ModalWindow } from '../../../../../components/modal/ModalWindow';

type CardType = {
  product: ProductType;
};

export const ProductCard = ({ product }: CardType) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [imageURL, setImageUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [discount, setDiscount] = useState('');
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);

  useEffect(() => {
    const { url } = product.masterVariant.images[0];
    if (url) {
      setImageUrl(url);
    } else {
      setImageUrl('./default-card-background.jpg');
    }
    const { value, discounted } = product.masterVariant.prices[0];
    const priceValue = value.centAmount / 10 ** value.fractionDigits;
    setPrice(priceValue);
    setCurrency(value.currencyCode);
    if (discounted) {
      const priceDiscounted = discounted.value.centAmount / 10 ** discounted.value.fractionDigits;
      setDiscount(((1 - discounted.value.centAmount / value.centAmount) * 100).toFixed(0));
      setPriceWithDiscount(priceDiscounted);
    }
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
    <div className={styles.card} onClick={clickHandle}>
      <div className={styles.cardContainer}>
        <div className={styles.cardDescriptionContainer} style={{ backgroundImage: `url(${imageURL})` }}>
          <h2 className={styles.cardTitle}>{product.name['en-US']}</h2>
          <p className={styles.cardDescription}> {product.description['en-US']}</p>
        </div>
      </div>
      <div className={styles.priceInfo}>
        {discount ? (
          <span>
            <s>{price}</s>
          </span>
        ) : (
          <span>{price}</span>
        )}
        <span>{currency}</span>
        {Boolean(discount) && (
          <>
            <span className={styles.discount}>-{discount}%</span>
            <span className={styles.discountPrice}>{priceWithDiscount}</span>
            <span className={styles.discountPriceCurrency}>{currency}</span>
          </>
        )}
      </div>
      {error && <ModalWindow message={error} onClose={() => setError(() => '')} />}
    </div>
  );
};
