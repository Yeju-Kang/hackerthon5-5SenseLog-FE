// components/DiaryCard.jsx
import React, { useState } from "react";
import "./DiaryCard.scss";

const DiaryCard = ({ diary }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked((prev) => !prev);

  return (
    <div className="diary-card box">
      <div className="diary-header">
        <span className="nickname">👤 {diary.nickname || "익명"}</span>
        <span className="date">📅 {diary.date}</span>
      </div>

      <div className="tags mt-2">
        {diary.tags?.map((tag) => (
          <span key={tag} className="tag is-link is-light">
            #{tag}
          </span>
        ))}
      </div>

      <p className="content mt-2">{diary.content}</p>

      <div className="like-section mt-3">
        <button
          className={`button is-small ${liked ? "is-danger" : "is-light"}`}
          onClick={toggleLike}
        >
          {liked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
        </button>
      </div>
    </div>
  );
};

export default DiaryCard;
