import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import MyPage from "./pages/myspace/MySpacePage";
import ExplorePage from "./pages/explore/ExplorePage";
import SignUpPage from "./pages/auth/SignupPage";

const hasAccessToken = () => {
  return document.cookie
    .split("; ")
    .some((row) => row.startsWith("accessToken="));
};

function App() {
  const isLoggedIn = hasAccessToken();

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/my" replace /> : <LoginPage />}
      />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
