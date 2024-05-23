import styles from './navigation.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button/Button';
import { useStore } from '../../store/useStore';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '../burger-menu/BurgerMenu';
import { getBasicToken } from '../../api/commers-tools-api';

export const Navigation = () => {
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
              style={styles.navBtn}
              onClick={() => {
                navigate('/');
                isOpenBurger && handleBurger();
              }}
              title="Main"
            />
          </li>
          <li>
            {isLogged ? (
              <Button
                style={styles.navBtn}
                onClick={() => {
                  navigate('/profile');
                  isOpenBurger && handleBurger();
                }}
                title="Profile"
              />
            ) : (
              <Button
                style={styles.navBtn}
                onClick={() => {
                  navigate('/login');
                  isOpenBurger && handleBurger();
                }}
                title="Login"
              />
            )}
          </li>
          <li>
            {isLogged ? (
              <Button
                style={styles.navBtn}
                onClick={() => {
                  localStorage.clear();
                  getBasicToken();
                  setLogged(false);
                  isOpenBurger && handleBurger();
                }}
                title="Logout"
              />
            ) : (
              <Button
                style={styles.navBtn}
                onClick={() => {
                  navigate('/registration');
                  isOpenBurger && handleBurger();
                }}
                title="Registration"
              />
            )}
          </li>
        </ul>
      </nav>
      <BurgerMenu isOpen={isOpenBurger} onClick={handleBurger} />
    </>
  );
};
