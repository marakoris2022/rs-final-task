import styles from './navigation.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { useStore } from '../../store/useStore';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '../burger-menu/burger-menu';

export default function Navigation() {
  const navigate = useNavigate();
  const { isLogged, setLogged } = useStore((state) => ({
    isLogged: state.isLogged,
    setLogged: state.setLogged,
  }));
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const handleBurger = () => {
    setIsOpenBurger((prev) => !prev);
    if (!isOpenBurger) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isOpenBurger && window.innerWidth > 768) {
        setIsOpenBurger(false);
        document.body.classList.remove('no-scroll');
        window.removeEventListener('resize', handleResize);
      }
    };

    if (isOpenBurger) {
      window.addEventListener('resize', handleResize);
    } else {
      window.removeEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpenBurger]);

  return (
    <>
      <nav className={`${styles.navMenu} ${isOpenBurger ? styles.active : ''}`} onClick={handleBurger}>
        <ul className={`${styles.ulMenu} ${isOpenBurger ? styles.active : ''}`} onClick={(e) => e.stopPropagation()}>
          <li>
            <Button
              style={'nav__btn'}
              onClick={() => {
                navigate('/');
                isOpenBurger && handleBurger();
              }}
              title="Main"
            />
          </li>
          <li>
            <Button
              style={'nav__btn'}
              onClick={() => {
                isLogged ? navigate('/profile') : navigate('/login');
                isOpenBurger && handleBurger();
              }}
              title={isLogged ? 'Profile' : 'Login'}
            />
          </li>
          <li>
            <Button
              style={'nav__btn'}
              onClick={() => {
                localStorage.clear();
                isLogged ? setLogged(false) : navigate('/registration');
                isOpenBurger && handleBurger();
              }}
              title={isLogged ? 'Logout' : 'Registration'}
            />
          </li>
        </ul>
      </nav>
      <BurgerMenu isOpen={isOpenBurger} onClick={handleBurger} />
    </>
  );
}
