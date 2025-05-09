import React from "react";
import "./EmotionFilter.scss";

const EMOTION_TAGS = ["행복", "기쁨", "보통", "슬픔", "우울"];

const EmotionFilter = ({ selectedTag, onSelect }) => {
  return (
    <div className="emotion-filter mb-4">
      <div className="tags are-medium">
        {EMOTION_TAGS.map((tag) => (
          <span
            key={tag}
            className={`tag emotion-tag ${selectedTag === tag ? "active" : ""}`}
            onClick={() => onSelect(selectedTag === tag ? null : tag)}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmotionFilter;
