import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Registration from './pages/registration/Registration';
import Notfoundpage from './pages/notfoundpage/Notfoundpage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { isLoggedContext } from './utils/islogged-context';
import { useState } from 'react';

function App() {
  const [isLoggedUser, setIsLoggedUser] = useState(false);

  return (
    <>
      <isLoggedContext.Provider value={{ isLoggedUser, setIsLoggedUser }}>
        <Header />
        <Routes>
          <Route path="/login" element={isLoggedUser ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/registration" element={isLoggedUser ? <Navigate to="/" replace /> : <Registration />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Notfoundpage />} />
        </Routes>
        <Footer />
      </isLoggedContext.Provider>
    </>
  );
}

export default App;
