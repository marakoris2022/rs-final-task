import styles from './navigation.module.scss';
import { useStore } from '../../store/useStore';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '../burger-menu/BurgerMenu';
import { getBasicToken } from '../../api/commers-tools-api';
import { CustomLink } from '../custom-link/CustomLink';

export const Navigation = () => {
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
            <CustomLink
              to="/"
              onClick={() => {
                isOpenBurger && handleBurger();
              }}
            >
              Catalog
            </CustomLink>
          </li>
          <li>
            {isLogged ? (
              <CustomLink
                to="/profile/personal-info"
                onClick={() => {
                  isOpenBurger && handleBurger();
                }}
              >
                Profile
              </CustomLink>
            ) : (
              <CustomLink
                to="/login"
                onClick={() => {
                  isOpenBurger && handleBurger();
                }}
              >
                Login
              </CustomLink>
            )}
          </li>
          <li>
            {isLogged ? (
              <CustomLink
                to="/login"
                onClick={() => {
                  localStorage.clear();
                  getBasicToken();
                  setLogged(false);
                  isOpenBurger && handleBurger();
                }}
              >
                Logout
              </CustomLink>
            ) : (
              <CustomLink
                to="/registration"
                onClick={() => {
                  isOpenBurger && handleBurger();
                }}
              >
                Registration
              </CustomLink>
            )}
          </li>
        </ul>
      </nav>
      <BurgerMenu isOpen={isOpenBurger} onClick={handleBurger} />
    </>
  );
};
