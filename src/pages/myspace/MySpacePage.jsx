import React, { useState, useEffect } from "react";
import "./MySpacePage.scss";
import MyDiaryToday from "../../components/MyDiaryToday";
import DiaryList from "../../components/DiaryList";
import EmotionReport from "../../components/EmotionReport";
import DiaryItem from "../../components/DiaryItem";
import { fetchDiaryList } from "../../api/diary";

const TABS = [
  { id: "write", label: "✏️ 오늘의 일기" },
  { id: "list", label: "📜 일기 목록" },
  { id: "analytics", label: "📈 감정 리포트" },
];

const MySpacePage = () => {
  const [activeTab, setActiveTab] = useState("write");
  const [diaries, setDiaries] = useState([]);
  const [todayDiary, setTodayDiary] = useState(null);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadDiaries = async (pageToLoad = 0) => {
    try {
      const userId = 1; // 또는 localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetchDiaryList(userId, pageToLoad, 20);
      const newDiaries = res.data.data;

      if (pageToLoad === 0) {
        setDiaries(newDiaries);
      } else {
        setDiaries((prev) => [...prev, ...newDiaries]);
      }

      setHasNextPage(newDiaries.length === 20);
      setPage(pageToLoad + 1);

      // 오늘 일기 판단 (최초 로드 시만 수행)
      if (pageToLoad === 0) {
        const today = new Date().toISOString().split("T")[0];
        const todayDiaryEntry = newDiaries.find((d) =>
          d.createAt.startsWith(today)
        );
        setTodayDiary(todayDiaryEntry || null);
      }
    } catch (error) {
      console.error("일기 목록 불러오기 실패 ❌", error);
    }
  };

  useEffect(() => {
    loadDiaries(0); // 첫 페이지 로딩
  }, []);

  return (
    <section className="section my-space-page">
      <div className="container">
        <div className="tabs is-toggle is-fullwidth is-rounded custom-tabs">
          <ul>
            {TABS.map((tab) => (
              <li
                key={tab.id}
                className={activeTab === tab.id ? "is-active" : ""}
              >
                <button
                  className="tab-button"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tab-content mt-5">
          {activeTab === "write" &&
            (todayDiary ? (
              <DiaryItem
                date={todayDiary.createAt.split("T")[0]}
                content={todayDiary.content}
                tags={[]}
                message={todayDiary.aiMessage}
                isToday={true}
                isPrivate={todayDiary.isPrivate}
              />
            ) : (
              <MyDiaryToday />
            ))}

          {activeTab === "list" && (
            <DiaryList
              diaries={diaries}
              hasNextPage={hasNextPage}
              onLoadMore={() => loadDiaries(page)}
            />
          )}

          {activeTab === "analytics" && <EmotionReport />}
        </div>
      </div>
    </section>
  );
};

export default MySpacePage;
