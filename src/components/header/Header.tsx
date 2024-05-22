import styles from './header.module.scss';
import { Navigation } from '../navigation/Navigation';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2>Header</h2>
      <Navigation />
    </header>
  );
};
