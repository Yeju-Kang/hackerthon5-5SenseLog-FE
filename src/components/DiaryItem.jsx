import React from "react";
import { deleteDiary } from "../api/diary";
// import "./DiaryItem.scss";

const DiaryItem = ({ diary, onDeleted }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠어요?");
    if (!confirmed) return;

    try {
      const res = await deleteDiary(diary.id);
      if (res.status === 200 || res.status === 204) {
        if (onDeleted) onDeleted(diary.id); // ✅ 삭제 성공 시 콜백 호출
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 실패 ❌", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="diary-card box">
      <div className="diary-header is-flex is-justify-content-space-between">
        <span className="diary-date">📅 {diary.createAt?.split("T")[0]}</span>
        <button
          className="delete-button button is-small is-danger is-light"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>

      <p className="diary-content">{diary.content}</p>

      <div className="tags mt-3">
        {diary.subTags?.map((tag) => (
          <span key={tag} className="tag is-link">
            #{tag}
          </span>
        ))}
      </div>

      <p className="comfort mt-4 ai-message-box">
        🤖 <strong>AI 위로 메시지 :</strong> <em>{diary.aiMessage}</em>
      </p>

      <p className="mt-3 is-size-7 has-text-grey">
        공개 설정: {diary.isPrivate === false ? "전체 공개" : "나만 보기"}
      </p>
    </div>
  );
};

export default DiaryItem;
