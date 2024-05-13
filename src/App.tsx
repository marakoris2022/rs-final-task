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

function App() {
  const isLogged = useStore((state) => state.isLogged);

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
