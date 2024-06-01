import { useLocation, Link } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import homeImg from '/home-icon.svg';

export const Breadcrumbs = ({ currantPage }: { currantPage?: string }) => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index, arr) => {
      currentLink += `/${crumb}`;
      let crumbName = crumb;

      if (currantPage && index === arr.length - 1) {
        crumbName = currantPage;
      }

      return (
        <div className={styles.crumb} key={crumb}>
          <Link className={styles.crumbLink} to={currentLink}>
            {crumbName}
          </Link>
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
