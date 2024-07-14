import { NavLink } from 'react-router-dom';
import './Header..css';

function Header() {
  return (
    <>
      <nav>
        <NavLink className="header-link" to="." end>
          Home
        </NavLink>
      </nav>
    </>
  );
}

export default Header;
