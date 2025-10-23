import { Link, useLocation } from 'react-router-dom';
import { NavLinkContainer } from './styles';

interface NavLinkProps {
  title: string;
  path: string;
  includes?: boolean;
}

export default function NavLink({
  title,
  path,
  includes = false
}: NavLinkProps) {
  const location = useLocation();

  function verifyIfIsActive() {
    if (includes) {
      return location.pathname.includes(path);
    }
    return path === location.pathname;
  }

  const isActive = verifyIfIsActive();

  return (
    <NavLinkContainer $isActive={isActive}>
      <Link to={path}>
        <p>{title}</p>
      </Link>
    </NavLinkContainer>
  );
}

NavLink.defaultProps = {
  includes: false
};