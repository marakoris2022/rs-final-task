import styles from './main.module.scss';
import { Button } from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.catalog}>
      <nav className={styles.navigate}>
        <Button style={styles.nav__btn} onClick={() => navigate('/')} title={'Main'} />
        <Button style={styles.nav__btn} onClick={() => navigate('/login')} title={'Login'} />
        <Button style={styles.nav__btn} onClick={() => navigate('/registration')} title={'Registration'} />
      </nav>
      <section className={styles.main__section}>
        <h2>Main Page</h2>
      </section>
    </main>
  );
};
