import { Link } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  return (
    <ul className={styles.breadcrumbList}>
      <li>
        <Link ></Link>
      </li>
      <li>
        <Link ></Link>
      </li>
      <li>
        <Link ></Link>
      </li>
    </ul>
  );
};
