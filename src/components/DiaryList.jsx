import React, { useState } from "react";
import DiaryItem from "./DiaryItem";
import EmotionFilter from "./EmotionFilter"; // 필터 컴포넌트 불러오기

const initialMockDiaries = [
  {
    id: 1,
    date: "2025-05-09",
    content: "오늘 햇살이 따뜻해서 기분이 좋았어!",
    tags: ["기쁨", "감사"],
    message: "오늘 하루를 따뜻하게 느끼셨군요. 그런 날은 오래 기억에 남아요 ☀️",
  },
  {
    id: 2,
    date: "2025-05-08",
    content: "너무 바빠서 정신이 하나도 없었어.",
    tags: ["피곤함", "불안"],
    message:
      "바쁜 하루 속에서도 당신은 잘 해내고 있어요. 잠시 숨을 고르는 것도 괜찮아요 💜",
  },
];

const DiaryList = () => {
  const [diaries, setDiaries] = useState(initialMockDiaries);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      setDiaries((prev) => prev.filter((diary) => diary.id !== id));
    }
  };

  const filteredDiaries = selectedTag
    ? diaries.filter((d) => d.tags.includes(selectedTag))
    : diaries;

  return (
    <div className="diary-list-wrapper">
      <EmotionFilter selectedTag={selectedTag} onSelect={setSelectedTag} />

      {filteredDiaries.length === 0 ? (
        <p className="has-text-grey">작성된 일기가 없습니다.</p>
      ) : (
        <ul className="diary-list">
          {filteredDiaries.map((diary) => (
            <li key={diary.id}>
              <DiaryItem
                date={diary.date}
                content={diary.content}
                tags={diary.tags}
                message={diary.message}
                onDelete={() => handleDelete(diary.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiaryList;
