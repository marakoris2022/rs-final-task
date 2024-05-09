import './App.scss';
import { Route, Routes } from 'react-router-dom';
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
    <><isLoggedContext.Provider value={{ isLoggedUser, setIsLoggedUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="*" element={<Notfoundpage />}></Route>
        </Routes>
        <Footer />
      </isLoggedContext.Provider>
    </>
  );
}

export default App;
