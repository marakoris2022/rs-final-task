import styles from './notFoundPage.module.scss';
import { Button } from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.notFound}>
      <Button style={styles.backToMain} onClick={() => navigate('/')} title={'Main'} />
    </main>
  );
};
