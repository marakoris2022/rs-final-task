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
import { About } from './pages/about/About';
import { Basket } from './pages/basket/Basket';
import { Path } from './interfaces/enum';

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
      <div className="scrollContainer">
        <img src="background_static2.jpg" alt="Scrolling Image" className="scrollImage"></img>
        <img src="background_static2.jpg" alt="Scrolling Image" className="scrollImage"></img>
        <img src="background_static2.jpg" alt="Scrolling Image" className="scrollImage"></img>
      </div>

      <Routes>
        <Route path={Path.Home} element={<Layout />}>
          <Route index element={<Catalog />} />
          <Route path={Path.CategoryData} element={<Category />} />
          <Route path={Path.Login} element={isLogged ? <Navigate to={Path.Home} replace /> : <Login />} />
          <Route path={Path.Registration} element={isLogged ? <Navigate to={Path.Home} replace /> : <Registration />} />
          <Route path={Path.Profile} element={isLogged ? <Profile /> : <Navigate to={Path.Login} replace />} />
          <Route
            path={Path.ProfilePersonalInfo}
            element={isLogged ? <Profile /> : <Navigate to={Path.Login} replace />}
          />
          <Route path={Path.ProfileAddresses} element={isLogged ? <Profile /> : <Navigate to={Path.Login} replace />} />
          <Route path={Path.About} element={<About />} />
          <Route path={Path.AddAddress} element={isLogged ? <AddAddress /> : <Navigate to={Path.Login} replace />} />
          <Route path={Path.ProductKey} element={<Product />} />
          <Route path={Path.Basket} element={<Basket />} />
          <Route path={Path.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
