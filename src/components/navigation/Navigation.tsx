import './navigation.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
// import { useIsLoggedContext } from '../../utils/islogged-context';
import { useStore } from '../../store/useStore';

export default function Navigation() {
  const navigate = useNavigate();
  // const { isLoggedUser, setIsLoggedUser } = useIsLoggedContext();
  const { isLogged, setLogged } = useStore();

  return (
    <nav>
      <ul>
        <li>
          <Button style={'nav__btn'} onClick={() => navigate('/')} title="Main" />
        </li>
        <li>
          <Button
            style={'nav__btn'}
            onClick={() => {
              // isLoggedUser ? console.log('PROFILE') : navigate('/login');
              isLogged ? console.log('PROFILE') : navigate('/login');
            }}
            // title={isLoggedUser ? 'Profile' : 'Login'}
            title={isLogged ? 'Profile' : 'Login'}
          />
        </li>
        <li>
          <Button
            style={'nav__btn'}
            onClick={() => {
              isLogged ? setLogged(false) : navigate('/Registration');
              // isLoggedUser ? setIsLoggedUser(() => false) : navigate('/Registration');
            }}
            title={isLogged ? 'Logout' : 'Registration'}
            // title={isLoggedUser ? 'Logout' : 'Registration'}
          />
        </li>
      </ul>
    </nav>
  );
}
