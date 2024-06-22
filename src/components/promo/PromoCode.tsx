import React from 'react';
import styles from './promoCode.module.scss';
import { PromoItem } from './promoItem/PromoItem';
export interface PromoItemProps {
  title: string;
  discountClass: string;
  discountName: string;
  discountValue: string;
}

const promoCodes: PromoItemProps[] = [
  { title: 'All games', discountClass: styles.rsteamDiscount, discountName: 'rsteam10off', discountValue: '10' },
  { title: 'Racing games', discountClass: styles.raceDiscount, discountName: 'racing50off', discountValue: '50' },
];

export const PromoCode: React.FC = () => {
  return (
    <div className={styles.promoContainer}>
      {promoCodes.map((item, index) => (
        <PromoItem
          key={index}
          title={item.title}
          discountClass={item.discountClass}
          discountName={item.discountName}
          discountValue={item.discountValue}
        />
      ))}
    </div>
  );
};
