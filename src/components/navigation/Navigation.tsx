import './navigation.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { useIsLoggedContext } from '../../utils/islogged-context';

export default function Navigation() {
  const navigate = useNavigate();
  const { isLoggedUser, setIsLoggedUser } = useIsLoggedContext();

  return (
    <nav>
      <ul>
        <li>
          <Button style={'nav__btn'} onClick={() => navigate('/')} title="Main" />
        </li>
        <li>
          <Button style={'nav__btn'} onClick={() => { isLoggedUser ? console.log('PROFILE') : navigate('/login'); }}  title={isLoggedUser ? 'Profile' : 'Login'} />
        </li>
        <li>
          <Button style={'nav__btn'} onClick={() => { isLoggedUser ? setIsLoggedUser(() => false) : navigate('/Registration'); }} title={isLoggedUser ? 'Logout' : 'Registration'} />
        </li>
      </ul>
    </nav>
  );
}
