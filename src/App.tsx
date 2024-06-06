import './app.scss';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Catalog } from './pages/main/Catalog';
import { Profile } from './pages/profile/Profile';
import { Registration } from './pages/registration/Registration';
import { NotFoundPage } from './pages/notfoundpage/NotFoundPage';
import { Product } from './pages/product/Product';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import { initializeUserSession } from './services/initializeUserSession';
import { AddAddress } from './components/user-addresses/add-address/AddAddress';
import { Loading } from './components/loading/Loading';
import { Category } from './pages/category/Category';

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
  const isToken = useStore((state) => state.isToken);

  useEffect(() => {
    initializeUserSession(isLogged);
  }, [isLogged]);

  if (!isToken) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Catalog />} />
          <Route path="/category/:data" element={<Category />} />
          <Route path="/login" element={isLogged ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/registration" element={isLogged ? <Navigate to="/" replace /> : <Registration />} />
          <Route path="/profile" element={isLogged ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/profile/personal-info" element={isLogged ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/profile/addresses" element={isLogged ? <Profile /> : <Navigate to="/login" replace />} />
          <Route
            path="/profile/addresses/add-address"
            element={isLogged ? <AddAddress /> : <Navigate to="/login" replace />}
          />
          <Route path="/catalog/:key" element={<Product />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
