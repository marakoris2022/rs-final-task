import { useNavigate } from "react-router-dom"
import styles from './registration-prompt.module.scss';

export const RegistrationPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.registration__prompt__container}>
      <span>Don't have an account yet?</span>
      <a onClick={() => navigate('/registration')}>Register</a>
    </div>
  )
}
