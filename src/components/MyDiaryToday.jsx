import React, { useState } from "react";
import DiaryItem from "./DiaryItem";
import { createDiary } from "../api/diary";

const extractMockEmotions = (text) => {
  if (text.includes("기뻐") || text.includes("좋아")) return ["기쁨", "감사"];
  if (text.includes("힘들") || text.includes("피곤")) return ["피곤함", "지침"];
  return ["보통"];
};

const generateMockComfortMessage = (emotions) => {
  if (emotions.includes("기쁨")) return "오늘도 당신 덕분에 세상이 밝아요.";
  if (emotions.includes("피곤함")) return "오늘도 애썼어요. 푹 쉬어야 해요.";
  return "마음 가는 대로 흘러가도 괜찮아요.";
};

const MyDiaryToday = () => {
  const [diaryContent, setDiaryContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emotionTags, setEmotionTags] = useState([]);
  const [comfortMessage, setComfortMessage] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async () => {
    try {
      const userId = 4;
      const diaryRequest = { content: diaryContent, isPrivate };
      console.log("diaryRequest", diaryRequest);
      await createDiary(userId, diaryRequest);

      const detectedEmotions = extractMockEmotions(diaryContent);
      const message = generateMockComfortMessage(detectedEmotions);

      setEmotionTags(detectedEmotions);
      setComfortMessage(message);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("일기 저장 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("오늘의 일기를 삭제하시겠어요?")) {
      setDiaryContent("");
      setEmotionTags([]);
      setComfortMessage("");
      setIsSubmitted(false);
    }
  };

  if (isSubmitted) {
    const today = new Date().toISOString().split("T")[0];
    return (
      <div className="my-diary-today">
        <DiaryItem
          date={today}
          content={diaryContent}
          tags={emotionTags}
          message={comfortMessage}
          onDelete={handleDelete}
          isToday
          isPrivate={isPrivate}
        />
        <p className="mt-3 is-size-7 has-text-grey">
          공개 설정: {isPrivate === false ? "전체 공개" : "나만 보기"}
        </p>
      </div>
    );
  }

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
          {[true, false].map((option) => (
            <button
              key={option}
              className={`button ${
                isPrivate === option ? "is-light" : "is-link is-selected"
              }`}
              onClick={() => setIsPrivate(option)}
            >
              {option === true ? "나만 보기" : "전체 공개"}
            </button>
          ))}
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
