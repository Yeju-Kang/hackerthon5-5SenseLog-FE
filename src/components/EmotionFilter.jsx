// components/EmotionFilter.jsx
import React from "react";
import "./EmotionFilter.scss";

const EMOTION_TAGS = ["기쁨", "우울", "불안", "감사", "피곤", "행복", "슬픔"];

const EmotionFilter = ({ selectedTag, onSelect }) => {
  return (
    <div className="emotion-filter">
      <div className="tags are-medium">
        {EMOTION_TAGS.map((tag) => (
          <span
            key={tag}
            className={`tag emotion-tag ${
              selectedTag === tag ? "is-link is-light" : ""
            }`}
            onClick={() => onSelect(tag === selectedTag ? null : tag)}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmotionFilter;
