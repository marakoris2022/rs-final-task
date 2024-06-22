import styles from './navigation.module.scss';
import { useStore } from '../../store/useStore';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '../burger-menu/BurgerMenu';
import { getBasicToken } from '../../api/commers-tools-api';
import { CustomLink } from '../custom-link/CustomLink';
import { GiShoppingCart } from 'react-icons/gi';
import { useCartStore } from '../../store/useCartStore';
import { Path } from '../../interfaces/enum';

const setDocumentScrollBehaviour = (disable: boolean) => {
  if (disable) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
};

export const Navigation = () => {
  const { isLogged, setLogged } = useStore((state) => ({
    isLogged: state.isLogged,
    setLogged: state.setLogged,
  }));
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const cart = useCartStore((state) => state.cart);

  const handleBurger = () => {
    setIsOpenBurger((prev) => !prev);
    setDocumentScrollBehaviour(!isOpenBurger);
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
              to={Path.Home}
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
                to={Path.ProfilePersonalInfo}
                onClick={() => {
                  isOpenBurger && handleBurger();
                }}
              >
                Profile
              </CustomLink>
            ) : (
              <CustomLink
                to={Path.Login}
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
                to={Path.Login}
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
                to={Path.Registration}
                onClick={() => {
                  isOpenBurger && handleBurger();
                }}
              >
                Registration
              </CustomLink>
            )}
          </li>
          <li>
            <CustomLink
              to={Path.About}
              onClick={() => {
                isOpenBurger && handleBurger();
              }}
            >
              About Us
            </CustomLink>
          </li>
          <li>
            <div className={styles.basketContainer}>
              <CustomLink
                to={Path.Basket}
                onClick={() => {
                  isOpenBurger && handleBurger();
                }}
              >
                <GiShoppingCart className={styles.shoppingCart} />
              </CustomLink>
              {cart?.lineItems.length !== 0 && (
                <div className={styles.basketNumberOfItems}>
                  -{' '}
                  {cart?.lineItems.reduce((acc, item) => {
                    acc += item.quantity;
                    return acc;
                  }, 0)}
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
      <BurgerMenu isOpen={isOpenBurger} onClick={handleBurger} />
    </>
  );
};
