import styles from './loading.module.scss';
import { FaSpinner } from 'react-icons/fa';

export const Loading = () => {
  return (
    <div className={styles.loadingDiv}>
      Loading...
      <FaSpinner className={styles.spinner} />
    </div>
  );
};
