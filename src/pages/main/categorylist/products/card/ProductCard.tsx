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
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [discount, setDiscount] = useState(0);
  const [priceWithDiscount, setPriceWithDiscount] = useState('');

  useEffect(() => {
    console.log(product)
    const { url } = product.masterVariant.images[0];
    if (url) {
      setImageUrl(url);
    } else {
      setImageUrl('./default-card-background.jpg');
    }
    const { value } = product.masterVariant.prices[0];
    const priceValue = value.centAmount / 10 ** value.fractionDigits;
    setPrice(priceValue);
    setCurrency(value.currencyCode);
    const rand = Math.floor(Math.random() * 10);
    if (rand < 6 && rand > 3) {
      setDiscount(Math.floor(rand * 10));
      setPriceWithDiscount(((priceValue * rand) / 100).toFixed(2));
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
      <Button style={styles.cardBtn} title="Info" type="button" onClick={clickHandle}></Button>
      <h2 className={styles.cardTitle}>{product.name['en-US']}</h2>
      <div className={styles.cardContainer}>
        <div className={styles.cardDescriptionContainer} style={{ backgroundImage: `url(${imageURL})` }}>
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
