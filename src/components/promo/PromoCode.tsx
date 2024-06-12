import React from 'react';
import styles from './promoCode.module.scss';
import { PromoItem } from './promoItem/PromoItem';
export interface PromoItemProps {
  discountClass: string;
  discountName: string;
  discountValue: string;
}

const promoCodes: PromoItemProps[] = [
  { discountClass: styles.rsteamDiscount, discountName: 'rsteam10off', discountValue: '10' },
  { discountClass: styles.raceDiscount, discountName: 'racing50off', discountValue: '50' },
];

export const PromoCode: React.FC = () => {
  return (
    <div className={styles.promoContainer}>
      {promoCodes.map((item, index) => (
        <PromoItem
          key={index}
          discountClass={item.discountClass}
          discountName={item.discountName}
          discountValue={item.discountValue}
        />
      ))}
    </div>
  );
};
