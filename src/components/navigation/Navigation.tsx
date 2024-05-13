import './navigation.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { useStore } from '../../store/useStore';

export default function Navigation() {
  const navigate = useNavigate();
  const { isLogged, setLogged } = useStore((state) => ({
    isLogged: state.isLogged,
    setLogged: state.setLogged,
  }));

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
              isLogged ? navigate('/profile') : navigate('/login');
            }}
            title={isLogged ? 'Profile' : 'Login'}
          />
        </li>
        <li>
          <Button
            style={'nav__btn'}
            onClick={() => {
              localStorage.clear();
              isLogged ? setLogged(false) : navigate('/registration');
            }}
            title={isLogged ? 'Logout' : 'Registration'}
          />
        </li>
      </ul>
    </nav>
  );
}
