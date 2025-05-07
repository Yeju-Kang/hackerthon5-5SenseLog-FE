import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import MySpacePage from "./pages/myspace/MySpacePage";
// import WriteDiaryPage from "./pages/myspace/WriteDiaryPage";
// import MyDiaryListPage from "./pages/myspace/MyDiaryListPage";
// import EmotionGraphPage from "./pages/mypage/EmotionGraphPage";
// import ExplorePage from "./pages/explore/ExplorePage";
// import ExploreTagPage from "./pages/explore/ExploreTagPage";
// import SimilarEmotionPage from "./pages/explore/SimilarEmotionPage";
// import OppositeEmotionPage from "./pages/explore/OppositeEmotionPage";
// import NotFoundPage from "./pages/common/NotFoundPage";
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
    <BrowserRouter>
      <LayoutWithConditionalHeader>
        <Routes>
          {/* 로그인 */}
          <Route path="/" element={<LoginPage />} />
          {/* 나만의 공간 */}
          <Route path="/my" element={<MySpacePage />} />
          {/* <Route path="/write" element={<WriteDiaryPage />} />
          <Route path="/my-diaries" element={<MyDiaryListPage />} />
          <Route path="/emotion-graph" element={<EmotionGraphPage />} />

          {/* 공감의 공간 */}
          {/* <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/tag/:tagName" element={<ExploreTagPage />} />
          <Route path="/explore/similar" element={<SimilarEmotionPage />} />
          <Route path="/explore/opposite" element={<OppositeEmotionPage />} /> */}
          {/* 예외 처리 */}
          {/* <Route path="*" element={<NotFoundPage />} /> */} */}
        </Routes>
      </LayoutWithConditionalHeader>
    </BrowserRouter>
  );
}

export default App;
