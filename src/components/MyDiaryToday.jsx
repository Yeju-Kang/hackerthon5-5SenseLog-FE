import React, { useState } from "react";
import DiaryItem from "./DiaryItem";

const mockExtractEmotions = (content) => {
  if (content.includes("기뻐") || content.includes("좋아"))
    return ["기쁨", "감사"];
  if (content.includes("힘들") || content.includes("피곤"))
    return ["피곤함", "지침"];
  return ["보통"];
};

const mockComfortMessage = (emotions) => {
  if (emotions.includes("기쁨")) return "오늘도 당신 덕분에 세상이 밝아요.";
  if (emotions.includes("피곤함")) return "오늘도 애썼어요. 푹 쉬어야 해요.";
  return "마음 가는 대로 흘러가도 괜찮아요.";
};

const MyDiaryToday = () => {
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emotions, setEmotions] = useState([]);
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState("private");

  const handleSubmit = () => {
    const extracted = mockExtractEmotions(content);
    const comfort = mockComfortMessage(extracted);
    setEmotions(extracted);
    setMessage(comfort);
    setSubmitted(true);
  };

  const handleDelete = () => {
    if (window.confirm("오늘의 일기를 삭제하시겠어요?")) {
      setContent("");
      setEmotions([]);
      setMessage("");
      setSubmitted(false);
    }
  };

  if (submitted) {
    const todayDate = new Date().toISOString().split("T")[0];
    return (
      <div className="my-diary-today">
        <DiaryItem
          date={todayDate}
          content={content}
          tags={emotions}
          message={message}
          onDelete={handleDelete}
          isToday={true}
          visibility={visibility}
        />
        <p className="mt-3 is-size-7 has-text-grey">
          공개 설정: {visibility === "public" ? "전체 공개" : "나만 보기"}
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="mt-4">
        <p className="has-text-weight-semibold mb-2">
          🔓 이 일기를 공유하고 싶으신가요?
        </p>
        <div className="buttons has-addons">
          <button
            className={`button ${
              visibility === "private" ? "is-link is-selected" : "is-light"
            }`}
            onClick={() => setVisibility("private")}
          >
            나만 보기
          </button>
          <button
            className={`button ${
              visibility === "public" ? "is-link is-selected" : "is-light"
            }`}
            onClick={() => setVisibility("public")}
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
