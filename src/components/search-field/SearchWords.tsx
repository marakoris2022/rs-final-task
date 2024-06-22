import React from 'react';
import { useCategoryStore } from '../../store/useCategoryStore';
import cn from 'classnames';
import styles from './searchWords.module.scss';

type SearchWordsProps = {
  setPage: (data: number) => void;
};

const SearchWords = ({ setPage }: SearchWordsProps) => {
  const searchWords = useCategoryStore((state) => state.searchWords);
  const setOffset = useCategoryStore((state) => state.setOffset);
  const setSearchWords = useCategoryStore((state) => state.setSearchWords);
  const setSearchWordsForFetching = useCategoryStore((state) => state.setSearchWordsForFetching);

  const searchHandler = (event: React.MouseEvent<HTMLElement>) => {
    const clicked = event.target as HTMLElement;
    const searchedWordsInput = clicked.nextElementSibling as HTMLInputElement | null;
    if (!searchedWordsInput || searchedWordsInput.value.length < 3) return;
    setSearchWords(searchedWordsInput.value);
    setSearchWordsForFetching(searchedWordsInput.value);
    setOffset(0);
    setPage(1);
  };

  return (
    <label className={styles.searchLabel} htmlFor="searchField">
      <span onClick={searchHandler} className={styles.glassImg} />
      <input
        autoComplete="off"
        placeholder="Search..."
        className={styles.searchField}
        type="text"
        id="searchField"
        name="searchField"
        value={searchWords}
        onBlur={() => {
          document.getElementById('suggestion')?.classList.add(styles.hidden);
        }}
        onFocus={(event) => {
          const val = event.target.value;
          if (val.length < 3) {
            document.getElementById('suggestion')?.classList.remove(styles.hidden);
          }
        }}
        onChange={(event) => {
          const val = event.target.value;
          setSearchWords(val);
          if (val.length < 3) {
            document.getElementById('suggestion')?.classList.remove(styles.hidden);
          } else {
            document.getElementById('suggestion')?.classList.add(styles.hidden);
          }
        }}
      />
      <p className={cn('suggestion', styles.hidden)} id="suggestion" style={{ color: 'red' }}>
        Require 3 characters or more
      </p>
    </label>
  );
};

export { SearchWords };
