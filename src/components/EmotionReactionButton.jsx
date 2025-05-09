import React, { useState, useEffect } from "react";
import "./EmotionReactionButton.scss";
import { submitDiaryEmotion } from "../api/diaryLikes";

const emotions = [
  { id: "angry", emoji: "😠", label: "우울" },
  { id: "sad", emoji: "😢", label: "슬픔" },
  { id: "neutral", emoji: "😐", label: "보통" },
  { id: "happy", emoji: "😊", label: "기쁨" },
  { id: "excited", emoji: "😁", label: "행복" },
];

const EmotionReactionButton = ({ diaryId, initialEmotion }) => {
  const [selected, setSelected] = useState(null);

  console.log("diaryId", diaryId);

  useEffect(() => {
    if (initialEmotion) {
      setSelected(initialEmotion);
    }
  }, [initialEmotion]);

  const handleEmotionClick = async (emotionLabel) => {
    const isSame = selected === emotionLabel;
    console.log("selected", selected);

    console.log("emotionLabel", emotionLabel);

    try {
      await submitDiaryEmotion(diaryId, isSame ? null : emotionLabel);
      setSelected(isSame ? null : emotionLabel);
    } catch (err) {
      console.error("감정 전송 실패:", err);
    }
  };

  return (
    <div className="emotion-reaction-container">
      {emotions.map((emotion) => (
        <button
          key={emotion.id}
          className={`emotion-btn ${
            selected === emotion.label ? "selected" : ""
          }`}
          onClick={() => handleEmotionClick(emotion.label)}
          aria-label={emotion.label}
        >
          <span className="emoji">{emotion.emoji}</span>
        </button>
      ))}
    </div>
  );
};

export default EmotionReactionButton;
