import React from "react";
import EmotionReactionButton from "./EmotionReactionButton";
import "./DiaryCard.scss";

const DiaryCard = ({ diary }) => {
  return (
    <div className="diary-card box">
      <div className="diary-header is-flex is-justify-content-space-between">
        <div className="diary-meta">
          <span className="icon-text">
            <span className="icon">👤</span>
            <span className="nickname has-text-weight-semibold">
              {diary.writerNickname}
            </span>
          </span>
          <div className="tags mt-2">
            {diary.subTags?.map((tag) => (
              <span key={tag} className="tag is-light is-rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <span className="date icon-text">
          <span className="icon">🗓️</span>
          <span>{diary.createAt.split("T")[0]}</span>
        </span>
      </div>

      <p className="diary-content mt-3">{diary.content}</p>

      {diary.message && (
        <p className="diary-message mt-4">💬 {diary.message}</p>
      )}

      {/* 👉 우측 정렬된 좋아요 버튼 */}
      <div className="like-button-wrapper is-flex is-justify-content-flex-end mt-4">
        <EmotionReactionButton />
      </div>
    </div>
  );
};

export default DiaryCard;
