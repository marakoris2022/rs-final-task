import styles from './header.module.scss';
import { Navigation } from '../navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import logoImg from '/website_logo.png';
import { Path } from '../../interfaces/enum';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div onClick={() => navigate(Path.Home)} className={styles.logoWrapper}>
        <img className={styles.logoImg} src={logoImg} alt="Logo" />
        <span className={styles.logoText}>RSTeam Games Store</span>
      </div>
      <Navigation />
    </header>
  );
};
