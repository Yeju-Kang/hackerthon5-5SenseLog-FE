import React, { useState, useEffect } from "react";
import "./MySpacePage.scss";
import MyDiaryToday from "../../components/MyDiaryToday";
import DiaryList from "../../components/DiaryList";
import EmotionReport from "../../components/EmotionReport";
import { fetchDiaryList, fetchDiaryByDay } from "../../api/diary";

const TABS = [
  { id: "write", label: "✏️ 오늘의 일기" },
  { id: "list", label: "📜 일기 목록" },
  { id: "analytics", label: "📈 감정 리포트" },
];

const MySpacePage = () => {
  const [activeTab, setActiveTab] = useState("write");
  const [diaries, setDiaries] = useState([]);
  const [todayData, setTodayData] = useState(null);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadTodayDiary = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await fetchDiaryByDay(today);
      const todayList = res.data?.data || [];
      setTodayData(todayList.length > 0 ? todayList[0] : null);
    } catch (error) {
      console.error("오늘 일기 조회 실패 ❌", error);
    }
  };

  const loadDiaries = async (pageToLoad = 0) => {
    try {
      const res = await fetchDiaryList(pageToLoad);
      const newDiaries = res.data.data || [];

      if (pageToLoad === 0) {
        setDiaries(newDiaries);
      } else {
        setDiaries((prev) => [...prev, ...newDiaries]);
      }

      setHasNextPage(newDiaries.length === 20);
      setPage(pageToLoad + 1);
    } catch (error) {
      console.error("일기 목록 불러오기 실패 ❌", error);
    }
  };

  useEffect(() => {
    loadTodayDiary();
    loadDiaries(0);
  }, []);

  useEffect(() => {
    if (activeTab === "write") {
      loadTodayDiary();
    }
  }, [activeTab]);

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
          {activeTab === "write" && (
            <MyDiaryToday diary={todayData} onDeleted={loadTodayDiary} />
          )}

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
