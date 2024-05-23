import './app.scss';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Main } from './pages/main/Main';
import { Profile } from './pages/profile/Profile';
import { Registration } from './pages/registration/Registration';
import { NotFoundPage } from './pages/notfoundpage/NotFoundPage';
import { Product } from './pages/product/Product';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import { initializeUserSession } from './services/initializeUserSession';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export const App = () => {
  const isLogged = useStore((state) => state.isLogged);

  useEffect(() => {
    initializeUserSession(isLogged);
  }, [isLogged]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/login" element={isLogged ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/registration" element={isLogged ? <Navigate to="/" replace /> : <Registration />} />
          <Route path="/profile" element={isLogged ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/products/:key" element={<Product />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
