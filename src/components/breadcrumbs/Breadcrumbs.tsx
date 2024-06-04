import { useLocation, Link } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import homeImg from '/home-icon.svg';

type BreadcrumbsPages = {
  currantPage?: string;
  subPage?: string;
};

export const Breadcrumbs = ({ currantPage, subPage }: BreadcrumbsPages) => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index, arr) => {
      let crumbName = crumb;

      if (subPage && index === arr.length - 2) {
        crumbName = subPage;
        currentLink += `/category`;
      }
      if (currantPage && index === arr.length - 1) {
        crumbName = currantPage;
      }

      currentLink += `/${crumbName}`;

      return (
        <div className={styles.crumb} key={crumb}>
          {index === arr.length - 1 ? (
            <span className={styles.crumbLink}>{crumbName}</span>
          ) : (
            <Link className={styles.crumbLink} to={currentLink}>
              {crumbName}
            </Link>
          )}
        </div>
      );
    });
  crumbs.unshift(
    <div className={styles.crumb} key={'Catalog'}>
      <Link className={styles.crumbLink} to={'/'}>
        <img width={'20px'} src={homeImg} />
      </Link>
    </div>,
  );

  return <div className={styles.breadcrumbs}>{crumbs}</div>;
};
