import styles from './burgerMenuCatalog.module.scss';

type BurgerMenuCatalogProps = {
  onClick: () => void;
};

export const BurgerMenuCatalog = ({ onClick }: BurgerMenuCatalogProps) => {
  return (
    <>
      <div className={styles.burgerContainer} onClick={onClick}>
        <img src="./catalog.svg" className={styles.burgerIcon}></img>
      </div>
    </>
  );
};
