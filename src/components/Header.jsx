import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import { logout } from "../api/auth";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    try {
      await logout(); // 서버 로그아웃 요청
      navigate("/"); // 홈으로 이동
    } catch (err) {
      console.error("로그아웃 실패 ❌", err);
    }
  };

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
      <button className="logout-btn" onClick={handleLogout}>
        로그아웃
      </button>
    </header>
  );
}

export default Header;
