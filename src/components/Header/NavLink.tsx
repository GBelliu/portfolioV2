import { Link, useLocation } from 'react-router-dom';
import { NavLinkContainer } from './styles';

interface NavLinkProps {
  title: string;
  path: string;
  includes?: boolean;
  newTab?: boolean;
}

export default function NavLink({
  title,
  path,
  includes = false,
  newTab = false
}: NavLinkProps) {
  const location = useLocation();

  function verifyIfIsActive() {
    if (newTab) {
      return false;
    }
    if (includes) {
      return location.pathname.includes(path);
    }
    return path === location.pathname;
  }

  const isActive = verifyIfIsActive();

  return (
    <NavLinkContainer $isActive={isActive}>
      <Link
        to={path}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        reloadDocument={newTab}
      >
        <p>{title}</p>
      </Link>
    </NavLinkContainer>
  );
}

NavLink.defaultProps = {
  includes: false,
  newTab: false
};