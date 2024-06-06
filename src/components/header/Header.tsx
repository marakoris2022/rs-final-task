import styles from './header.module.scss';
import { Navigation } from '../navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import logoImg from '/website_logo.png';
import { useCartStore } from '../../store/useCartStore';

export const Header = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);

  return (
    <header className={styles.header}>
      <div onClick={() => navigate('/')} className={styles.logoWrapper}>
        <img className={styles.logoImg} src={logoImg} alt="Logo" />
        <span className={styles.logoText}>RSTeam Games Store</span>
      </div>
      <button onClick={() => console.log(cart)}>cart log</button>
      <button onClick={() => navigate('/cart')}>cart page</button>
      <Navigation />
    </header>
  );
};
