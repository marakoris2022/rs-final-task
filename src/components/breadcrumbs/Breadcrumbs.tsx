import { useLocation, Link } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div className={styles.crumb} key={crumb}>
          <Link className={styles.crumbLink} to={currentLink}>
            {crumb}
          </Link>
        </div>
      );
    });
  crumbs.unshift(
    <div className={styles.crumb} key={'Catalog'}>
      <Link className={styles.crumbLink} to={'/'}>
        <span className={styles.homeImage}></span>
      </Link>
    </div>,
  );

  return <div className={styles.breadcrumbs}>{crumbs}</div>;
};
