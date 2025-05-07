import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="glass-header">
      <nav className="nav-wrapper">
        <Link
          to="/my"
          className={isActive("/my") ? "nav-item active" : "nav-item"}
        >
          나만의 공간
        </Link>
        <Link
          to="/explore"
          className={isActive("/explore") ? "nav-item active" : "nav-item"}
        >
          공감의 공간
        </Link>
      </nav>
    </header>
  );
}

export default Header;
