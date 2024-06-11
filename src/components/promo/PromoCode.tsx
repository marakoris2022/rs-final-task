import { useCallback } from 'react';
import styles from './promoCode.module.scss';
import cn from 'classnames';

export const PromoCode = () => {
  const clickHandler = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const btn = event.target;
    if (btn instanceof HTMLElement) {
      btn.closest(`.${styles.promoItem}`)?.classList.add(styles.hiddenItem);
    }
  }, []);

  return (
    <div className={styles.promoContainer}>
      <div className={cn(styles.promoItem, styles.rsteamDiscount)}>
        <span className={styles.promoName}>rsteam10off</span>
        <span className={styles.promoText}>-10%</span>
        <div className={styles.closeBtn} onClick={clickHandler}></div>
      </div>
      <div className={cn(styles.promoItem, styles.raceDiscount)}>
        <span className={styles.promoName}>racing50off</span>
        <span className={styles.promoText}>-50%</span>
        <div className={styles.closeBtn} onClick={clickHandler}></div>
      </div>
    </div>
  );
};
