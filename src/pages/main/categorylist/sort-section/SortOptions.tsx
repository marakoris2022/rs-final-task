import styles from './sortOptions.module.scss';

export const SortOptions = () => {
  return (
    <>
      <fieldset>
        <legend
          style={{
            color: '#fff',
          }}
        >
          Sort by discount:
        </legend>
        <div className={styles.radioWrapper}>
          <input type="radio" id="allProducts" name="discountedProducts" value="all" checked />
          <label className={styles.radioLabel} htmlFor="allProducts">
            all products
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input type="radio" id="discountedOnly" name="discountedProducts" value="discounted" />
          <label className={styles.radioLabel} htmlFor="discountedOnly">
            with discount
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend
          style={{
            color: '#fff',
          }}
        >
          Sort by Price:
        </legend>

        <div className={styles.radioWrapper}>
          <input type="radio" id="priceAsc" name="priceSorting" value="asc" />
          <label className={styles.radioLabel} htmlFor="priceAsc">
            from low to high price
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input type="radio" id="priceDesc" name="priceSorting" value="desc" />
          <label className={styles.radioLabel} htmlFor="priceDesc">
            from high to low price
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend
          style={{
            color: '#fff',
          }}
        >
          Sort by Name:
        </legend>
        <div className={styles.radioWrapper}>
          <input type="radio" id="az" name="nameSorting" value="az" />
          <label className={styles.radioLabel} htmlFor="az">
            from A to Z
          </label>
        </div>
        <div className={styles.radioWrapper}>
          <input type="radio" id="za" name="nameSorting" value="za" />
          <label className={styles.radioLabel} htmlFor="za">
            from Z to A
          </label>
        </div>
      </fieldset>
    </>
  );
};
