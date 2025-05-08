import React, { useState, useEffect } from "react";
import DiaryItem from "./DiaryItem";
import EmotionFilter from "./EmotionFilter";

const DiaryList = ({ diaries = [], hasNextPage, onLoadMore }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  // 필터링 처리
  useEffect(() => {
    if (selectedTag) {
      setFiltered(diaries.filter((d) => d.emotionTags?.includes(selectedTag)));
    } else {
      setFiltered(diaries);
    }
  }, [diaries, selectedTag]);

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      setFiltered((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    await onLoadMore(); // 부모에서 전달된 fetch 함수
    setLoading(false);
  };

  return (
    <div className="diary-list-wrapper">
      <EmotionFilter selectedTag={selectedTag} onSelect={setSelectedTag} />

      {filtered.length === 0 && !loading ? (
        <p className="has-text-grey">작성된 일기가 없습니다.</p>
      ) : (
        <>
          <ul className="diary-list">
            {filtered.map((diary) => (
              <li key={diary.id}>
                <DiaryItem
                  date={diary.createAt?.split("T")[0]}
                  content={diary.content}
                  tags={diary.emotionTags || []}
                  message={diary.aiMessage || ""}
                  onDelete={() => handleDelete(diary.id)}
                />
              </li>
            ))}
          </ul>

          {loading && (
            <div className="has-text-centered mt-4">
              <p className="has-text-grey-light">로딩 중...</p>
            </div>
          )}

          {!loading && hasNextPage && (
            <div className="has-text-centered mt-5">
              <button
                className="button is-link is-light is-rounded"
                onClick={handleLoadMore}
              >
                ⬇️ 더 보기
              </button>
            </div>
          )}

          {!loading && !hasNextPage && filtered.length > 0 && (
            <div className="has-text-centered mt-5">
              <p className="has-text-grey-light">더 이상 일기가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DiaryList;
