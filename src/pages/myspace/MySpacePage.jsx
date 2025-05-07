import React, { useState } from "react";
import "./MySpacePage.scss";
import MyDiaryToday from "../../components/MyDiaryToday";
import DiaryList from "../../components/DiaryList";
import EmotionReport from "../../components/EmotionReport";

const TABS = [
  { id: "write", label: "✏️ 오늘의 일기" },
  { id: "list", label: "📜 일기 목록" },
  { id: "analytics", label: "📈 감정 리포트" },
];

const MySpacePage = () => {
  const [activeTab, setActiveTab] = useState("write");

  return (
    <section className="section my-space-page">
      <div className="container">
        {/* Bulma 탭 UI 유지 */}
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

        {/* 콘텐츠 영역 */}
        <div className="tab-content mt-5">
          {activeTab === "write" && <MyDiaryToday />}
          {activeTab === "list" && <DiaryList />}
          {activeTab === "analytics" && <EmotionReport />}
        </div>
      </div>
    </section>
  );
};

export default MySpacePage;
