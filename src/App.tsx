import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Registration from './pages/registration/Registration';
import Notfoundpage from './pages/notfoundpage/Notfoundpage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { login, signUp, tokenRequest } from './utils/commers-tools-api';
import { useEffect } from 'react';

function App() {
  const password = 'Kr1uk3ov5a78$'
  const email = 'krukovaolga2@gmail.com'
  const firstName = 'Olga';
  const lastName = 'Krukova';

  useEffect(() => {
    /* signUp(email, firstName, lastName, password); */
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="*" element={<Notfoundpage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
