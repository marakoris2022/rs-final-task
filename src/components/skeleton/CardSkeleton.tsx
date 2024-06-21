import ContentLoader from 'react-content-loader';
import styles from './cardSkeleton.module.scss';

const CategoryLoader = () => (
  <ContentLoader
    className={styles.cardSkeleton}
    speed={2}
    viewBox="0 0 420 300"
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
  >
    <rect x="12" y="35" rx="0" ry="0" width="6" height="246" />
    <rect x="14" y="34" rx="0" ry="0" width="408" height="6" />
    <rect x="416" y="34" rx="0" ry="0" width="6" height="246" />
    <rect x="12" y="276" rx="0" ry="0" width="408" height="6" />
    <rect x="30" y="53" rx="6" ry="6" width="375" height="15" />
    <rect x="12" y="77" rx="7" ry="7" width="410" height="160" />
    <rect x="12" y="250" rx="5" ry="5" width="410" height="20" />
  </ContentLoader>
);

export default CategoryLoader;
