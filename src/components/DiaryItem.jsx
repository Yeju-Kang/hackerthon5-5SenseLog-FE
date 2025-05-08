// components/DiaryItem.jsx
import React from "react";
// import "./DiaryItem.scss";

const DiaryItem = ({
  date,
  content,
  tags = [],
  message,
  onDelete,
  isToday = false,
  isPrivate = true,
}) => {
  return (
    <div className="diary-card box">
      <div className="diary-header is-flex is-justify-content-space-between">
        <span className="diary-date">📅 {date}</span>
        {onDelete && (
          <button
            className="delete-button button is-small is-danger is-light"
            onClick={onDelete}
          >
            삭제
          </button>
        )}
      </div>
      <p className="diary-content">{content}</p>

      <div className="tags mt-3">
        {tags.map((tag) => (
          <span key={tag} className="tag is-link">
            #{tag}
          </span>
        ))}
      </div>

      <p className="comfort mt-4 ai-message-box">
        🤖 <strong>AI 위로 메시지 :</strong> <em>{message}</em>
      </p>
      {isToday && (
        <p className="mt-3 is-size-7 has-text-grey">
          공개 설정: {isPrivate === false ? "전체 공개" : "나만 보기"}
        </p>
      )}
    </div>
  );
};

export default DiaryItem;
