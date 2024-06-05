import { useNavigate } from 'react-router-dom';
import styles from './registrationPrompt.module.scss';

export const RegistrationPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.registrationPromptContainer}>
      <span>Don't have an account yet?</span>
      <a onClick={() => navigate('/registration')}>Register</a>
    </div>
  );
};
