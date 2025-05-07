// MyDiaryToday.jsx
import React, { useState } from "react";

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

  const handleSubmit = () => {
    const extracted = mockExtractEmotions(content);
    const comfort = mockComfortMessage(extracted);
    setEmotions(extracted);
    setMessage(comfort);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="my-diary-today">
        <h2 className="title is-5">오늘의 일기</h2>
        <div className="box">
          <p>{content}</p>
          <div className="tags mt-3">
            {emotions.map((tag) => (
              <span key={tag} className="tag is-link">
                #{tag}
              </span>
            ))}
          </div>
          <p className="comfort mt-4">💬 {message}</p>
        </div>
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
      <button className="button is-link mt-3" onClick={handleSubmit}>
        작성 완료
      </button>
    </div>
  );
};

export default MyDiaryToday;
