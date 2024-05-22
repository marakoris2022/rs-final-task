import './app.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Main } from './pages/main/Main';
import { Profile } from './pages/profile/Profile';
import { Registration } from './pages/registration/Registration';
import { NotFoundPage } from './pages/notfoundpage/Notfoundpage';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import { getBasicToken, getCustomerById } from './api/commers-tools-api';
import { ECommerceLS } from './interfaces/interfaces';

const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

export const App = () => {
  const isLogged = useStore((state) => state.isLogged);

  async function initializeUserSession() {
    !isLogged && (await getBasicToken());
    if (isLogged) {
      const commerceInfo = localStorage.getItem(ECommerceKey) as string | null;
      if (commerceInfo) {
        const { accessToken, customerId } = JSON.parse(commerceInfo) as ECommerceLS;
        customerId && (await getCustomerById(customerId, accessToken));
      }
    }
  }

  useEffect(() => {
    initializeUserSession();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={isLogged ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/registration" element={isLogged ? <Navigate to="/" replace /> : <Registration />} />
        <Route path="/profile" element={isLogged ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};
