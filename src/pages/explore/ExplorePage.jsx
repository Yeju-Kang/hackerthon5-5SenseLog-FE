// ExplorePage.jsx
import React, { useState, useEffect } from "react";
import EmotionFilter from "../../components/EmotionFilter";
import DiaryCard from "../../components/DiaryCard";
import "./ExplorePage.scss";

const ExplorePage = () => {
  const [allDiaries, setAllDiaries] = useState([]);
  const [similarDiaries, setSimilarDiaries] = useState([]);
  const [oppositeDiaries, setOppositeDiaries] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    // ⚠️ API 연동 전 mock 데이터
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
    setSimilarDiaries(mock.filter((d) => d.tags.includes("불안"))); // ✨ 내 감정 기준
    setOppositeDiaries(mock.filter((d) => d.tags.includes("기쁨")));
  }, []);

  const filteredDiaries = selectedTag
    ? allDiaries.filter((d) => d.tags.includes(selectedTag))
    : allDiaries;

  return (
    <section className="section explore-page">
      <div className="container">
        <h1 className="title is-4 has-text-primary">공감의 공간</h1>

        <EmotionFilter selected={selectedTag} onSelect={setSelectedTag} />

        <div className="section-block">
          <h2 className="subtitle is-5">📌 나와 비슷한 감정의 사람들</h2>
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
        </div>

        <div className="section-block">
          <h2 className="subtitle is-5">🪞 나와 반대 감정의 사람들</h2>
          {oppositeDiaries.length > 0 ? (
            <div className="diary-list">
              {oppositeDiaries.map((d) => (
                <DiaryCard key={d.id} diary={d} />
              ))}
            </div>
          ) : (
            <p className="has-text-grey">반대 감정의 일기가 아직 없어요.</p>
          )}
        </div>

        <div className="section-block">
          <h2 className="subtitle is-5">🌍 오늘의 전체 일기</h2>
          {filteredDiaries.length > 0 ? (
            <div className="diary-list">
              {filteredDiaries.map((d) => (
                <DiaryCard key={d.id} diary={d} />
              ))}
            </div>
          ) : (
            <p className="has-text-grey">일기가 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;
