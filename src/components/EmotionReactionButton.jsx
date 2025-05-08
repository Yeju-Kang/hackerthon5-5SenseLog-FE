import React, { useState } from "react";
import "./EmotionReactionButton.scss";

const emotions = [
  { id: "angry", emoji: "😠", label: "화남" },
  { id: "sad", emoji: "😢", label: "슬픔" },
  { id: "neutral", emoji: "😐", label: "그저 그럼" },
  { id: "happy", emoji: "😊", label: "기쁨" },
  { id: "excited", emoji: "😁", label: "행복" },
];

const EmotionReactionButton = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="emotion-reaction-container">
      {emotions.map((emotion) => (
        <button
          key={emotion.id}
          className={`emotion-btn ${selected === emotion.id ? "selected" : ""}`}
          onClick={() => setSelected(emotion.id)}
          aria-label={emotion.label}
        >
          <span className="emoji">{emotion.emoji}</span>
        </button>
      ))}
    </div>
  );
};

export default EmotionReactionButton;
