import styles from './sortOptions.module.scss';
import { useCategoryStore } from '../../../../store/useCategoryStore';
import { SortInput } from './SortInput';

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
        <SortInput
          id="moviesIncluded"
          name="movieProducts"
          value="false"
          title="all products"
          optionChecker={movieOption}
          handleChange={handleMovieChange}
        />

        <SortInput
          id="noMovies"
          name="movieProducts"
          value="true"
          title="no available movies"
          optionChecker={movieOption}
          handleChange={handleMovieChange}
        />
      </fieldset>

      <fieldset className={styles.discountWrapper} name="discountFieldSet">
        <legend className={styles.legend}>Sort by discount:</legend>
        <SortInput
          id="allProducts"
          name="discountedProducts"
          value="false"
          title="all products"
          optionChecker={discountOption}
          handleChange={handleDiscountChange}
        />
        <SortInput
          id="discountedOnly"
          name="discountedProducts"
          value="true"
          title="with discount"
          optionChecker={discountOption}
          handleChange={handleDiscountChange}
        />
      </fieldset>

      <fieldset className={styles.priceWrapper} name="sortingFieldSet">
        <legend className={styles.legend}>Sort options:</legend>

        <SortInput
          id="priceAsc"
          name="sorting"
          value="asc"
          data-name="price"
          title="price: low to high"
          optionChecker={sortingOption}
          handleChange={handleOptionChange}
        />

        <SortInput
          id="priceDesc"
          name="sorting"
          value="desc"
          data-name="price"
          title="price: high to low"
          optionChecker={sortingOption}
          handleChange={handleOptionChange}
        />

        <SortInput
          id="az"
          name="sorting"
          value="asc"
          data-name="name.en-us"
          title="from A to Z"
          optionChecker={sortingOption}
          handleChange={handleOptionChange}
        />

        <SortInput
          id="za"
          name="sorting"
          value="desc"
          title="from Z to A"
          data-name="name.en-us"
          optionChecker={sortingOption}
          handleChange={handleOptionChange}
        />
      </fieldset>
    </>
  );
};
