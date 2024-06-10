import { getPaginationItems } from './pagination';
import PageLink from './PageLink';
import styles from './pagination.module.css';
import { useCallback } from 'react';
import { useCategoryStore } from '../../store/useCategoryStore';

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export function Pagination({ currentPage, lastPage, maxLength, setCurrentPage }: Props) {
  const limit = useCategoryStore((state) => state.limit);
  const setOffset = useCategoryStore((state) => state.setOffset);

  const clickHandler = useCallback(
    (pageNum: number) => {
      setCurrentPage(pageNum);
      setOffset((pageNum - 1) * limit);
    },
    [limit, setCurrentPage, setOffset],
  );
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <PageLink disabled={currentPage === 1} onClick={() => clickHandler(currentPage - 1)}>
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => clickHandler(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      <PageLink disabled={currentPage === lastPage} onClick={() => clickHandler(currentPage + 1)}>
        Next
      </PageLink>
    </nav>
  );
}
