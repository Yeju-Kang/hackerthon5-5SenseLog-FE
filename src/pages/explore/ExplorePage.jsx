import React, { useState, useEffect } from "react";
import EmotionFilter from "../../components/EmotionFilter";
import DiaryCard from "../../components/DiaryCard";
import "./ExplorePage.scss";
import {
  fetchAllTodayDiaries,
  fetchAllTodayDiariesByTag,
} from "../../api/explore";
import { fetchDiaryByDay } from "../../api/diary"; // 내 오늘 일기 조회용

const TABS = [
  { id: "all", label: "🌍 모두의 일기장" },
  { id: "similar", label: "📌 함께 느낀 감정들" },
  { id: "opposite", label: "🪞 다른 마음의 이야기" },
];

// 감정 반대 매핑
const getOppositeTag = (tag) => {
  switch (tag) {
    case "행복":
      return "우울";
    case "기쁨":
      return "슬픔";
    case "보통":
      return "기쁨"; // 중립은 중립끼리
    case "슬픔":
      return "기쁨";
    case "우울":
      return "행복";
    default:
      return "보통";
  }
};

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("all");
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

  useEffect(() => {
    const loadDiariesByTab = async () => {
      try {
        if (activeTab === "all") {
          const res = await fetchAllTodayDiaries();
          setAllDiaries(res.data.data);
        }

        if (activeTab === "similar") {
          const offsetDate = new Date(Date.now() + 9 * 60 * 60 * 1000);
          const today = offsetDate.toISOString().split("T")[0];
          const myRes = await fetchDiaryByDay(today);
          const myDiaryList = myRes.data.data;

          if (myDiaryList) {
            const tag = myDiaryList.tag;
            const res = await fetchAllTodayDiariesByTag(tag);
            setSimilarDiaries(res.data.data);
          } else {
            setSimilarDiaries([]);
          }
        }

        if (activeTab === "opposite") {
          const offsetDate = new Date(Date.now() + 9 * 60 * 60 * 1000);
          const today = offsetDate.toISOString().split("T")[0];
          const myRes = await fetchDiaryByDay(today);
          const myDiaryList = myRes.data.data;

          if (myDiaryList) {
            const oppositeTag = getOppositeTag(myDiaryList.tag);
            const res = await fetchAllTodayDiariesByTag(oppositeTag);
            setOppositeDiaries(res.data.data);
          } else {
            setOppositeDiaries([]);
          }
        }
      } catch (error) {
        console.error("탭별 일기 불러오기 실패 ❌", error);
      }
    };

    loadDiariesByTab();
  }, [activeTab]);

  const filteredAll = selectedTag
    ? allDiaries.filter((d) => d.tag?.includes(selectedTag))
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
