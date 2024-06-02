import styles from './sortOptions.module.scss';

export const SortOptions = () => {
  return (
    <>
      <fieldset className={styles.movieWrapper} name="movieFieldSet">
        <legend
          style={{
            color: '#fff',
          }}
        >
          Movies:
        </legend>
        <div className={styles.radioWrapper}>
          <input className="movieSet" type="radio" id="moviesIncluded" name="movieProducts" value="false" />
          <label className={styles.radioLabel} htmlFor="all">
            all products
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input className="movieSet" type="radio" id="noMovies" name="movieProducts" value="true" />
          <label className={styles.radioLabel} htmlFor="noMovies">
            no available movies
          </label>
        </div>
      </fieldset>
      <fieldset className={styles.discountWrapper} name="discountFieldSet">
        <legend
          style={{
            color: '#fff',
          }}
        >
          Sort by discount:
        </legend>
        <div className={styles.radioWrapper}>
          <input className="discountSet" type="radio" id="allProducts" name="discountedProducts" value="false" />
          <label className={styles.radioLabel} htmlFor="allProducts">
            all products
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input className="discountSet" type="radio" id="discountedOnly" name="discountedProducts" value="true" />
          <label className={styles.radioLabel} htmlFor="discountedOnly">
            with discount
          </label>
        </div>
      </fieldset>
      <fieldset className={styles.priceWrapper} name="sortingFieldSet">
        <legend
          style={{
            color: '#fff',
          }}
        >
          Sort options:
        </legend>

        <div className={styles.radioWrapper}>
          <input className="sorting" type="radio" id="priceAsc" name="sorting" value="asc" data-name="price" />
          <label className={styles.radioLabel} htmlFor="priceAsc">
            price: low to high
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input className="sorting" type="radio" id="priceDesc" name="sorting" value="desc" data-name="price" />
          <label className={styles.radioLabel} htmlFor="priceDesc">
            price: high to low
          </label>
        </div>
        <div className={styles.radioWrapper}>
          <input className="sorting" type="radio" id="az" name="sorting" value="asc" data-name="name.en-us" />
          <label className={styles.radioLabel} htmlFor="az">
            from A to Z
          </label>
        </div>
        <div className={styles.radioWrapper}>
          <input className="sorting" type="radio" id="za" name="sorting" value="desc" data-name="name.en-us" />
          <label className={styles.radioLabel} htmlFor="za">
            from Z to A
          </label>
        </div>
      </fieldset>
    </>
  );
};
