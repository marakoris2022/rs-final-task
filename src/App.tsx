import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Profile from './pages/profile/Profile';
import Registration from './pages/registration/Registration';
import Notfoundpage from './pages/notfoundpage/Notfoundpage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import { ECommerceKey, getBasicToken, getCustomerById } from './api/commers-tools-api';
import { ECommerceLS } from './interfaces/interfaces';

function App() {
  const isLogged = useStore((state) => state.isLogged);
  useEffect(() => {
    !isLogged && getBasicToken();
    if (isLogged) {
      const commerceInfo = localStorage.getItem(ECommerceKey) as string | null;
      if (commerceInfo) {
        const { accessToken, customerId } = JSON.parse(commerceInfo) as ECommerceLS;
        customerId && getCustomerById(customerId, accessToken);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={isLogged ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/registration" element={isLogged ? <Navigate to="/" replace /> : <Registration />} />
        <Route path="/profile" element={isLogged ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
