// ExplorePage.jsx
import React, { useState, useEffect } from "react";
import EmotionFilter from "../../components/EmotionFilter";
import DiaryCard from "../../components/DiaryCard";
import "./ExplorePage.scss";

const TABS = [
  { id: "similar", label: "📌 함께 느낀 감정들" },
  { id: "opposite", label: "🪞 다른 마음의 이야기" },
  { id: "all", label: "🌍 모두의 일기장" },
];

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("similar");
  const [selectedTag, setSelectedTag] = useState(null);
  const [allDiaries, setAllDiaries] = useState([]);
  const [similarDiaries, setSimilarDiaries] = useState([]);
  const [oppositeDiaries, setOppositeDiaries] = useState([]);

  useEffect(() => {
    const mock = [
      {
        id: 1,
        nickname: "감성여우",
        tags: ["불안", "혼자"],
        content: "요즘 마음이 복잡해요.",
        date: "2025-05-09",
      },
      {
        id: 2,
        nickname: "햇살고래",
        tags: ["기쁨"],
        content: "오늘은 햇살이 예뻐서 산책했어요.",
        date: "2025-05-09",
      },
      {
        id: 3,
        nickname: "멍때리는너구리",
        tags: ["짜증", "피곤"],
        content: "회의 너무 많았어요.",
        date: "2025-05-09",
      },
    ];

    setAllDiaries(mock);
    setSimilarDiaries(mock.filter((d) => d.tags.includes("불안")));
    setOppositeDiaries(mock.filter((d) => d.tags.includes("기쁨")));
  }, []);

  const filteredAll = selectedTag
    ? allDiaries.filter((d) => d.tags.includes(selectedTag))
    : allDiaries;

  return (
    <section className="section explore-page">
      <div className="container">
        {/* 탭 메뉴 */}
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

        {/* 필터 (전체 탭에서만 노출) */}
        {activeTab === "all" && (
          <EmotionFilter selected={selectedTag} onSelect={setSelectedTag} />
        )}

        {/* 콘텐츠 영역 */}
        <div className="tab-content mt-5">
          {activeTab === "similar" && (
            <>
              {similarDiaries.length > 0 ? (
                <div className="diary-list">
                  {similarDiaries.map((d) => (
                    <DiaryCard key={d.id} diary={d} />
                  ))}
                </div>
              ) : (
                <p className="has-text-grey">
                  비슷한 감정을 가진 일기가 아직 없어요.
                </p>
              )}
            </>
          )}

          {activeTab === "opposite" && (
            <>
              {oppositeDiaries.length > 0 ? (
                <div className="diary-list">
                  {oppositeDiaries.map((d) => (
                    <DiaryCard key={d.id} diary={d} />
                  ))}
                </div>
              ) : (
                <p className="has-text-grey">반대 감정의 일기가 아직 없어요.</p>
              )}
            </>
          )}

          {activeTab === "all" && (
            <>
              {filteredAll.length > 0 ? (
                <div className="diary-list">
                  {filteredAll.map((d) => (
                    <DiaryCard key={d.id} diary={d} />
                  ))}
                </div>
              ) : (
                <p className="has-text-grey">일기가 없습니다.</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;
