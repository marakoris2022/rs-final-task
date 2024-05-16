import styles from './notfoundpage.module.scss';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

export default function Notfoundpage() {
  const navigate = useNavigate();

  return (
    <main className={styles.notFound}>
      <Button style={styles.backToMain} onClick={() => navigate('/')} title={'Main'} />
    </main>
  );
}
