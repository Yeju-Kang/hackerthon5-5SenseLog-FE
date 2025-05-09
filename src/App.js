import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import MyPage from "./pages/myspace/MySpacePage";
import ExplorePage from "./pages/explore/ExplorePage";
import SignUpPage from "./pages/auth/SignupPage";
import Header from "./components/Header";

function LayoutWithConditionalHeader({ children }) {
  const location = useLocation();
  const hideHeader = location.pathname === "/"; // 로그인 페이지에서는 헤더 숨김

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}

function App() {
  return (
    <LayoutWithConditionalHeader>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </LayoutWithConditionalHeader>
  );
}

export default App;
