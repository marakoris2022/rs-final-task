import './navigation.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <nav>
      <ul>
        <li>
          <Button style={'nav__btn'} onClick={() => navigate('/')} title="Main" />
        </li>
        <li>
          <Button style={'nav__btn'} onClick={() => navigate('/login')} title="Login" />
        </li>
        <li>
          <Button style={'nav__btn'} onClick={() => navigate('/registration')} title="Registration" />
        </li>
      </ul>
    </nav>
  );
}
