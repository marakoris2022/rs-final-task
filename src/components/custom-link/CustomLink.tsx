import { Link, useMatch } from 'react-router-dom';
import styles from './customLink.module.scss';

type CustomLinkProps = {
  children: React.ReactNode;
  to: string;
  onClick: () => void;
};

const CustomLink = ({ children, to, onClick }: CustomLinkProps) => {
  const match = useMatch(to);

  return (
    <Link to={to} className={match ? styles.active : styles.inactive} onClick={onClick}>
      {children}
    </Link>
  );
};

export { CustomLink };
