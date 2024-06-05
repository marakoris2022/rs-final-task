import styles from './burgerMenu.module.scss';

type BurgerMenuProps = {
  isOpen: boolean;
  onClick: () => void;
};

export const BurgerMenu = ({ isOpen, onClick }: BurgerMenuProps) => {
  return (
    <div className={`${styles.burgerMenuContainer} ${isOpen ? styles.active : ''}`} onClick={onClick}>
      <div className={styles.line}></div>
    </div>
  );
};
