import React from "react";
import "./DiaryList.scss";

const mockDiaries = [
  {
    id: 1,
    date: "2025-05-09",
    emotion: "😄",
    content: "오늘 햇살이 따뜻해서 기분이 좋았어!",
    tags: ["기쁨", "감사"],
    message: "오늘 하루를 따뜻하게 느끼셨군요. 그런 날은 오래 기억에 남아요 ☀️",
  },
  {
    id: 2,
    date: "2025-05-08",
    emotion: "😔",
    content: "너무 바빠서 정신이 하나도 없었어.",
    tags: ["피곤함", "불안"],
    message:
      "바쁜 하루 속에서도 당신은 잘 해내고 있어요. 잠시 숨을 고르는 것도 괜찮아요 💜",
  },
];

const DiaryList = () => {
  return (
    <div className="diary-list-wrapper">
      {mockDiaries.length === 0 ? (
        <p className="has-text-grey">작성된 일기가 없습니다.</p>
      ) : (
        <ul className="diary-list">
          {mockDiaries.map((diary) => (
            <li key={diary.id} className="diary-card box">
              <div className="diary-header">
                <span className="diary-date">📅 {diary.date}</span>
                <span className="diary-emotion">{diary.emotion}</span>
              </div>
              <p className="diary-content">{diary.content}</p>

              <div className="tags mt-3">
                {diary.tags.map((tag) => (
                  <span key={tag} className="tag is-link">
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="comfort mt-4">💬 {diary.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiaryList;
