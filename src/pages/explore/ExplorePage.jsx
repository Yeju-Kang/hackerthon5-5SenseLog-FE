import React, { useState, useEffect } from "react";
import EmotionFilter from "../../components/EmotionFilter";
import DiaryCard from "../../components/DiaryCard";
import "./ExplorePage.scss";
import { fetchAllTodayDiaries } from "../../api/explore"; // ✅ 추가

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

  // ✅ '모두의 일기장' 탭 클릭 시 API 호출
  useEffect(() => {
    if (activeTab === "all") {
      const loadAllDiaries = async () => {
        try {
          const res = await fetchAllTodayDiaries();
          setAllDiaries(res.data.data);
        } catch (error) {
          console.error("모두의 일기장 불러오기 실패 ❌", error);
        }
      };

      loadAllDiaries();
    }
  }, [activeTab]);

  const filteredAll = selectedTag
    ? allDiaries.filter((d) => d.tags?.includes(selectedTag))
    : allDiaries;

  return (
    <section className="section explore-page">
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

        {activeTab === "all" && (
          <EmotionFilter selected={selectedTag} onSelect={setSelectedTag} />
        )}

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
