import styles from './burgerMenu.module.scss';

type BurgerMenuProps = {
  isOpen: boolean;
  onClick: () => void;
};

export const BurgerMenu = ({ isOpen, onClick }: BurgerMenuProps) => {
  return (
    <div
      className={`${styles.square} ${isOpen ? styles.active : ''}`}
      onClick={onClick}
      data-testid="generalBurgerMenu"
    >
      <div className={styles.burgerwrap}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
