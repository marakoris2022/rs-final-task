import { useNavigate } from 'react-router-dom';
import styles from './registrationPrompt.module.scss';
import { Path } from '../../interfaces/enum';

export const RegistrationPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.registrationPromptContainer}>
      <span>Don't have an account yet?</span>
      <a onClick={() => navigate(Path.Registration)}>Register</a>
    </div>
  );
};
