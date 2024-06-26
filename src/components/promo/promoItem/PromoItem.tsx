import { useCallback } from 'react';
import styles from './promoItem.module.scss';
import cn from 'classnames';
import { PromoItemProps } from '../PromoCode';

export const PromoItem: React.FC<PromoItemProps> = ({ title, discountClass, discountName, discountValue }) => {
  const clickHandler = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const btn = event.target;
    if (btn instanceof HTMLElement) {
      btn.closest(`.${styles.promoItem}`)?.classList.add(styles.hiddenItem);
    }
  }, []);

  return (
    <div className={cn(styles.promoItem, discountClass)}>
      <p className={styles.promoTitle}>{title}</p>
      <p>
        <span className={styles.promoName}>{discountName}</span>
        <span className={styles.promoText}>-{discountValue}%</span>
      </p>
      <div className={styles.closeBtn} onClick={clickHandler}></div>
    </div>
  );
};
