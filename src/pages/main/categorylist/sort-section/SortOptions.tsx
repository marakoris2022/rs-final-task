import styles from './sortOptions.module.scss';
import { useCategoryStore } from '../../../../store/useCategoryStore';

export const SortOptions = () => {
  const sortingOption = useCategoryStore((state) => state.sortingOption);
  const setSortingOption = useCategoryStore((state) => state.setSortingOption);
  const discountOption = useCategoryStore((state) => state.discountOption);
  const setDiscountOption = useCategoryStore((state) => state.setDiscountOption);
  const movieOption = useCategoryStore((state) => state.movieOption);
  const setMovieOption = useCategoryStore((state) => state.setMovieOption);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortingOption(e.target.id);
  };

  const handleMovieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieOption(e.target.id);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountOption(e.target.id);
  };

  return (
    <>
      <fieldset className={styles.movieWrapper} name="movieFieldSet">
        <legend className={styles.legend}>Movies:</legend>
        <div className={styles.radioWrapper}>
          <input
            className="movieSet"
            type="radio"
            id="moviesIncluded"
            name="movieProducts"
            value="false"
            checked={movieOption === 'moviesIncluded'}
            onChange={handleMovieChange}
          />
          <label className={styles.radioLabel} htmlFor="all">
            all products
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input
            className="movieSet"
            type="radio"
            id="noMovies"
            name="movieProducts"
            value="true"
            checked={movieOption === 'noMovies'}
            onChange={handleMovieChange}
          />
          <label className={styles.radioLabel} htmlFor="noMovies">
            no available movies
          </label>
        </div>
      </fieldset>
      <fieldset className={styles.discountWrapper} name="discountFieldSet">
        <legend className={styles.legend}>Sort by discount:</legend>
        <div className={styles.radioWrapper}>
          <input
            className="discountSet"
            type="radio"
            id="allProducts"
            name="discountedProducts"
            value="false"
            checked={discountOption === 'allProducts'}
            onChange={handleDiscountChange}
          />
          <label className={styles.radioLabel} htmlFor="allProducts">
            all products
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input
            className="discountSet"
            type="radio"
            id="discountedOnly"
            name="discountedProducts"
            value="true"
            checked={discountOption === 'discountedOnly'}
            onChange={handleDiscountChange}
          />
          <label className={styles.radioLabel} htmlFor="discountedOnly">
            with discount
          </label>
        </div>
      </fieldset>
      <fieldset className={styles.priceWrapper} name="sortingFieldSet">
        <legend className={styles.legend}>Sort options:</legend>

        <div className={styles.radioWrapper}>
          <input
            className="sorting"
            type="radio"
            id="priceAsc"
            name="sorting"
            value="asc"
            data-name="price"
            checked={sortingOption === 'priceAsc'}
            onChange={handleOptionChange}
          />
          <label className={styles.radioLabel} htmlFor="priceAsc">
            price: low to high
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input
            className="sorting"
            type="radio"
            id="priceDesc"
            name="sorting"
            value="desc"
            data-name="price"
            checked={sortingOption === 'priceDesc'}
            onChange={handleOptionChange}
          />
          <label className={styles.radioLabel} htmlFor="priceDesc">
            price: high to low
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input
            className="sorting"
            type="radio"
            id="az"
            name="sorting"
            value="asc"
            data-name="name.en-us"
            checked={sortingOption === 'az'}
            onChange={handleOptionChange}
          />
          <label className={styles.radioLabel} htmlFor="az">
            from A to Z
          </label>
        </div>

        <div className={styles.radioWrapper}>
          <input
            className="sorting"
            type="radio"
            id="za"
            name="sorting"
            value="desc"
            data-name="name.en-us"
            checked={sortingOption === 'za'}
            onChange={handleOptionChange}
          />
          <label className={styles.radioLabel} htmlFor="za">
            from Z to A
          </label>
        </div>
      </fieldset>
    </>
  );
};
