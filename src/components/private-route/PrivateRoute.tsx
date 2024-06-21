import { Navigate } from 'react-router-dom';
import { Path } from '../../interfaces/enum';
import { useStore } from '../../store/useStore';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isLogged = useStore((state) => state.isLogged);

  return isLogged ? children : <Navigate to={Path.Login} replace />;
};
