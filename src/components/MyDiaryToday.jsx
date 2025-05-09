import React, { useState } from "react";
import DiaryItem from "./DiaryItem";
import { createDiary } from "../api/diary";
import { deleteDiary } from "../api/diary";

const MyDiaryToday = ({ diary, onDeleted }) => {
  const [diaryContent, setDiaryContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  const handleSubmit = async () => {
    try {
      const diaryRequest = { content: diaryContent, isPrivate };
      await createDiary(diaryRequest);
      window.location.reload(); // 작성 후 새로고침
    } catch (error) {
      console.error(error);
      alert("일기 저장 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠어요?");
    if (!confirmed) return;

    try {
      const res = await deleteDiary(diary.id);
      if (res.status === 200 || res.status === 204) {
        if (onDeleted) onDeleted(); // ❗ 상태만 다시 불러오기
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 실패 ❌", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // ✅ 오늘 일기 존재하면 보여주기
  if (diary && diary.id) {
    return (
      <div className="my-diary-today">
        <DiaryItem diary={diary} />
      </div>
    );
  }

  // ✅ 없으면 작성 UI
  return (
    <div className="my-diary-today">
      <h2 className="title is-5">✏️ 오늘의 일기를 작성해보세요</h2>

      <textarea
        className="textarea"
        placeholder="오늘의 기분이나 있었던 일을 50자 이내로 작성해주세요."
        maxLength={50}
        value={diaryContent}
        onChange={(e) => setDiaryContent(e.target.value)}
      />

      <div className="mt-4">
        <p className="has-text-weight-semibold mb-2">
          🔓 이 일기를 공유하고 싶으신가요?
        </p>
        <div className="buttons has-addons">
          <button
            className={`button ${
              isPrivate ? "is-link is-selected" : "is-light"
            }`}
            onClick={() => setIsPrivate(true)}
          >
            나만 보기
          </button>
          <button
            className={`button ${
              !isPrivate ? "is-link is-selected" : "is-light"
            }`}
            onClick={() => setIsPrivate(false)}
          >
            전체 공개
          </button>
        </div>
      </div>

      <div className="has-text-right mt-4">
        <button className="button is-link" onClick={handleSubmit}>
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default MyDiaryToday;
